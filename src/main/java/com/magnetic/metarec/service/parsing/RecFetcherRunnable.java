package com.magnetic.metarec.service.parsing;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.commons.io.FileUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

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
import java.io.*;
import java.net.URI;

/**
 * Created by dwhitesell on 4/20/16.
 */
public class RecFetcherRunnable implements Runnable{



    private URI requestURI;
    private HttpGet httpConnect;
    private String request_id;
    private StringBuilder loggingText;


    public RecFetcherRunnable(URI uri)
    {
        requestURI = uri;

        httpConnect = new HttpGet(requestURI);
        loggingText = new StringBuilder();

    }

    public RecFetcherRunnable(URI uri, String req_id)
    {
        requestURI = uri;
        request_id = req_id;
        httpConnect = new HttpGet(requestURI);
        loggingText = new StringBuilder();
    }

    public void run()
    {
        try {
            System.out.println("Getting Data from " + requestURI.toString());
            String responseFromRequest = getResponseFromRequest();
            this.parseRecommendations(responseFromRequest);
        } catch (Exception ex)
        {
            System.out.println("Ran into error while processing request " + request_id);
            ex.printStackTrace();
        } finally
        {
            outToLog();
        }
    }

    public String getResponseFromRequest() throws Exception
    {
        String response = "";
        CloseableHttpClient httpclient = HttpClients.createDefault();
        ResponseHandler<String> responseHandler = new ResponseHandler<String>() {
            @Override
            public String handleResponse(
                final HttpResponse response) throws ClientProtocolException, IOException {
                int status = response.getStatusLine().getStatusCode();
                if (status >= 200 && status < 300) {
                    HttpEntity entity = response.getEntity();
                    return entity != null ? EntityUtils.toString(entity) : null;
                } else {
                    throw new ClientProtocolException("Unexpected response status: " + status);
                }
            }

        };
        response = httpclient.execute(httpConnect, responseHandler);
        String mybuysJs = FileUtils.readFileToString(new File("mybuys_spoofjs.js"), "UTF-8");
        response = mybuysJs + "\n" + response ;
        if (request_id != null)
        {
            FileUtils.writeStringToFile(new File(request_id + ".response.log"), requestURI.toString());
        } else {    }
//        System.out.println("----------------------------------------");
//        System.out.println(response);
        return response;
    }

    public void parseRecommendations(String responseBody) throws Exception
    {
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("javascript");
        ScriptContext context = engine.getContext();
        StringWriter writer = new StringWriter();
        context.setWriter(writer);
        engine.eval(responseBody);
        String zonehtml = (String) ((ScriptObjectMirror) engine.get("zoneHtmls")).get("1");
        zonehtml = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n" + zonehtml;
        FileUtils.writeStringToFile(new File(this.request_id + ".eval.html"), zonehtml);

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
            System.out.println("ProductKey = " + productKey);
            System.out.println("client = " + client);
            System.out.println("customer category = " + customer_category);
            System.out.println("recipe id = " + recipe_id);
            System.out.println("policy id = " + policy);
            System.out.println("Criteria = " + criteria);
        }
        loggingText.append("\n\n\n\n--------------------\n\nFound " + number_of_recommendations + " recommendations in response");
    }

    public void outToLog()
    {
        try
        {
            FileUtils.writeStringToFile(new File(request_id + ".response.log"), loggingText.toString(), "UTF-8", true);
        } catch (IOException ioex)
        {
            ioex.printStackTrace();
        }
    }

    public static String prettyPrint(Document xml) throws Exception {
        Transformer tf = TransformerFactory.newInstance().newTransformer();
        tf.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
        tf.setOutputProperty(OutputKeys.INDENT, "yes");
        Writer out = new StringWriter();
        tf.transform(new DOMSource(xml), new StreamResult(out));
        return out.toString();
    }

}
