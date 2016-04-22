package com.magnetic.metarec.service;

import com.magnetic.metarec.domain.WebRecSimulation;
import com.magnetic.metarec.domain.reporting.ResponseParameters;
import com.magnetic.metarec.repository.ResponseParameterRepository;
import com.magnetic.metarec.repository.WebRecSimulationRepository;
import com.magnetic.metarec.service.util.RecFetcher;
import com.magnetic.metarec.service.util.UrlUtil;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;
import java.io.File;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * Created by kraja on 4/21/16.
 */

@Service
public class RecommendationService {

    @Inject
    ResponseParameterRepository responseParameterRepository;

    @Inject
    WebRecSimulationRepository webRecSimulationRepository;

    private ExecutorService taskExecutor;

    public void getRecommendations(WebRecSimulation request) {


        webRecSimulationRepository.save(request);
        int jobId = request.getId();

        try {

            List<Callable<RecFetcher>> tasks = new ArrayList<Callable<RecFetcher>>();


            int numQueries;

            if(request.getNumberOfQueries() == null) {
                numQueries = 1;
            } else {
                numQueries = Math.min(request.getNumberOfQueries(), 5);
            }

            URI uri = UrlUtil.getURI(request);

            for(int i = 0; i < numQueries; i++) {
                tasks.add(new RecFetcher(uri));
            }

//            testScriptEngine();

            /* invokeAll blocks until all service requests complete,
           * or a max of 10 seconds. */
            List<Future<RecFetcher>> results = taskExecutor.invokeAll(tasks, 10, TimeUnit.SECONDS);
            for (Future<RecFetcher> f : results) {

//                List<ResponseParameters> relevantParamsInResponseList = parseRecommendations(String.valueOf(f.get()));
                List<ResponseParameters> relevantParamsInResponseList = evaluateResponseJSToHTML(String.valueOf(f.get()));

                for(ResponseParameters responseParameters : relevantParamsInResponseList) {
                    responseParameters.setJobId(jobId);
                }

               responseParameterRepository.save(relevantParamsInResponseList);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }


    }

    @PostConstruct
    public void testString() {


    }

    public List<ResponseParameters> parseRecommendations(String responseBody) throws Exception {

        Pattern debugPattern = Pattern.compile("cl=\"(.*?)\" cp=\"(.*?)\" cc=\"(.*?)\" pr=\"(.*?)\" re=\"(.*?)\" po=\"(.*?)\" cr=\"(.*?)\"");

        List<ResponseParameters> reponseParametersList = new ArrayList<>();

        List<String> substrings = Arrays.asList(responseBody.split("</span>.*?<span\\sclass=\"MB_DEBUG\" "));
        for(String str : substrings) {
            Matcher debugMatcher = debugPattern.matcher(str);
            while(debugMatcher.find()) {
                ResponseParameters responseParams = new ResponseParameters();
                responseParams.setClient(debugMatcher.group(1));
                responseParams.setProductKey(debugMatcher.group(4));
                responseParams.setRecipeId(debugMatcher.group(5));
                responseParams.setPolicy(debugMatcher.group(6));
                responseParams.setCriteria(debugMatcher.group(7));

                reponseParametersList.add(responseParams);
            }
        }

        return reponseParametersList;

    }

    public List<ResponseParameters> evaluateResponseJSToHTML(String responseJS) throws Exception
    {
        List<ResponseParameters> reponseParametersList = new ArrayList<>();

        String responseBody = FileUtils.readFileToString(new File("mybuys_spoofjs.js"), "UTF-8") + responseJS;
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("javascript");
        ScriptContext context = engine.getContext();
        StringWriter writer = new StringWriter();
        context.setWriter(writer);
        engine.eval(responseBody);
        String zonehtml = (String) ((ScriptObjectMirror) engine.get("zoneHtmls")).get("1");
        zonehtml = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n" + zonehtml;

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        dbf.setValidating(false);
        DocumentBuilder db = dbf.newDocumentBuilder();
        InputSource inputSource = new InputSource( new StringReader( zonehtml) );

        XPath xpath = XPathFactory.newInstance().newXPath();

        String xpathExpression = "//div[@class ='MB_PRODUCTSLOT']";
        //<span class="MB_DEBUG" cl="JOANN" cp="" cc="" pr="zprd_13490602a" re="6912665" po="6912336" cr="6912334" style="display:none"></span>
        String MB_DEBUG_XPATH= "./span[@class='MB_DEBUG']";
        //String MB_PRODUCT_KEY_XPATH = "./";
        NodeList nodes = (NodeList) xpath.evaluate
            (xpathExpression, inputSource, XPathConstants.NODESET);
        int number_of_recommendations = nodes.getLength();

        for (int x = 0; x < nodes.getLength(); x ++)
        {
            Node currentNode = nodes.item(x);
            Node MB_DEBUG = (Node) xpath.evaluate(MB_DEBUG_XPATH, currentNode, XPathConstants.NODE);
            String productKey = MB_DEBUG.getAttributes().getNamedItem("pr").getNodeValue();
            String client = MB_DEBUG.getAttributes().getNamedItem("cl").getNodeValue();
            String customer_category = MB_DEBUG.getAttributes().getNamedItem("cc").getNodeValue();
            String recipe_id = MB_DEBUG.getAttributes().getNamedItem("re").getNodeValue();
            String policy  = MB_DEBUG.getAttributes().getNamedItem("po").getNodeValue();
            String criteria = MB_DEBUG.getAttributes().getNamedItem("cr").getNodeValue();
            ResponseParameters responseParams = new ResponseParameters();
            responseParams.setClient(client);
            responseParams.setProductKey(productKey);
            responseParams.setRecipeId(recipe_id);
            responseParams.setPolicy(policy);
            responseParams.setCriteria(criteria);
            reponseParametersList.add(responseParams);
        }
        return reponseParametersList;
    }

    public static String prettyPrint(Document xml) throws Exception {
        Transformer tf = TransformerFactory.newInstance().newTransformer();
        tf.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
        tf.setOutputProperty(OutputKeys.INDENT, "yes");
        Writer out = new StringWriter();
        tf.transform(new DOMSource(xml), new StreamResult(out));
        return out.toString();
    }


    public void setTaskExecutor(ExecutorService taskExecutor1) {
        this.taskExecutor = taskExecutor1;
    }

    public List<WebRecSimulation> getSimulationRuns(String client) {
        List<WebRecSimulation> clientSimulations = new ArrayList<>();

        List<WebRecSimulation> simulations = webRecSimulationRepository.findAll();
        for(WebRecSimulation sim : simulations) {
            if(sim.getClientIdentifier().equals(client)) {
                clientSimulations.add(sim);
            }
        }

        return clientSimulations;
    }
}


