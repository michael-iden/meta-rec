
/********************************************************************
 * Copyright � 2007-2013 MyBuys, Inc.  All Rights Reserved.
 ********************************************************************/

/*
 * The mybuys object holds essentially all functions and data that MyBuys
 * uses in a page.  The objective is to minimize the number of potential
 * namespace conflicts.
 *
 * This library (along with mbstyles.css and the client-specific setup.js
 * are loaded in the HTML page header.  The process of loading this library
 * initializes the mybuys object, establishes a baseline for override-able
 * CSS, and detects characteristics such as whether the browser is a variant
 * of IE and whether the current page is secure (i.e. it was served using https://).
 *
 * As part of the page, various placeholders define where signup link and/or 
 * recommendation zones should appear and in-line script elements supply parameters
 * to the mybuys object for use if a request is made to the servers.  These are
 * inserted into page templates by clients.
 *
 * No interactions with the MyBuys' servers occur unless the mybuys.initPage() function
 * is invoked.  This should be done at/near the bottom of the page to allow the
 * page to load before we start processing.
 */
var mybuys = {
	'version' : '6.0.0',
	'language' : 'en',
	'zonesEnabled' : false,
	'webrecRoot' : "http://t.p.mybuys.com/",
	'imgRoot' : "http://w.p.mybuys.com/",
	'signupRoot' : "http://a.p.mybuys.com/",
	'signupTemplates' : {},
	'signupImages' : {},
	'zoneTitleImage' : {},
	'client' : '',
	'mybuyscid' : '',
	'params' : {},
	'optParams' : {},
	'tparts' : {},
	'onPageItemIds' : [],
	'onPageItemUrlPattern' : null,
	'onPageItemUrlParam' : null,
	'requestProcId' : null,
	'renderOK' : true,
	'paramMap' : {	'wrz':'wrz',
					'pt':'pt',
					'productid':'cpc',
					'categoryid':'ckc',
					'brandname':'bnm',
					'keywords':'kws',
					'email':'email',
					'amount':'amt',
					'optin':'optin',
					'hfile':'hfile',
					'mybuys':'mybuys',
					'items':'skus',
					'orderid':'order',
					'mybuyscid':'mybuyscid',
					'otheritemtype':'oit',
					'otheritemids':'oid',
					'outofstock':'ostock'},
	'optParamMap' : {	'email':'email',
						'fullname':'name',
						'gender':'gender',
						'zipcode':'zip'},
	'pagetype' : null,
	'pageTypeMap' : {	'HOME' : 'h',
						'PRODUCT_DETAILS' : 'prod',
						'SHOPPING_CART' : 'cart',
						'ORDER_CONFIRMATION' : 'purchase',
						'CATEGORY' : 'cat',
						'SEARCH_RESULTS' : 'ks',
						'SALE' : 'sale',
						'NEW' : 'np',
						'BRAND' : 'brand',
						'BRAND_HOME' : 'bh',
						'HIGH_LEVEL_CATEGORY' : 'hcat',
						'TOP_LEVEL_CATEGORY' : 'tcat',
						'LANDING' : 'lnd',
						'CONTENT_ITEM' : 'ci',
						'CONTENT_CATEGORY' : 'cc',
						'MY_PAGE' : 'myp',
						'ADD_TO_CART' : 'cartadd',
						'RATINGS' : 'rate'},
	'idBased' : false,
	'oneClickDivId' : 'mboneclk',
	'zoneDivIds' : {1:'mbzone1',
					2:'mbzone2',
					3:'mbzone3',
					4:'mbzone4',
					5:'mbzone5',
					10:'mbzone10',
					11:'mbzone11',
					12:'mbzone12',
					13:'mbzone13',
					14:'mbzone14',
					20:'mbzone20',
					21:'mbzone21',
					22:'mbzone22',
					23:'mbzone23',
					24:'mbzone24'},
	'zoneKeysToZoneDivIds' : [],
	'setters' : {},
	'settersByPageType' : {},
	'failOverIntervalMsecs' : 1500,
	'failOverImages' : {},
	'responseXML' : '',
	'rowlist' : '',
	'altValueForZeroPrice' : 'Click For Price',

	// One click signup
	'rcBgColor' : "#29678D",
	'rcTextColor' : "#ffffff",
	'rcBgMOColor' : "#7CAAD1",
	'rcTextMOColor' : "#ffffff",
	'rcStdBtnBkColor' : "#29678D",
	'rcStdBtnBkMOColor' : "#5389AF",
	'rcStdBtnLiteBkColor' : "#7CAAD0",
	'rcStdBtnLiteBkMOColor' : "#5389AF",
	'rcSDMinWidth' : 215,
	'rcSDWidth' : 190,
	'rcSDHeight' : 80,
	'rcSDIndent' : 3,
	'rcSDExtraHeight' : 110,
	'rcHeightDelta' : 200,
	'rcTimerInterval' : 5,
	'rcCrtHeight' : 0,
	'rcDefEmail' : " Your Email Address",
	'rcBtnLabel' : "Alert me about more like this",
	'rcBtnAlt' : 'Alert me about more like this',
	'rcThxMsg' : "You're all signed up!",
	'rcSubmitBtnLabel' : "SUBMIT",
	'rcCancelBtnLabel' : "CANCEL",
	'rcPrivacyLinkLabel' : "It's safe and private",
	'rcWhatsThisLinkLabel' : "What's this?",
	'rcCrtBtn' : null,
	'oneclkImgSrc' : null,
	'oneclkIconImgSrc' :  null, //null:default Y-guy,"":1x1 pix
	'oneclkIconImgWidth' :  1,
	'oneclkIconImgHeight' :  1,
	'oneclkLinkLabel' : null,
	'oneclkLinkAlt' : 'Get Personalized Product Alerts',
	'signedupEmail' : null,
	'oneclkEvtElem' : null,
	'privacyContent' : 'Consumer privacy is very important to us, just as it is for you.  This summary is intended to inform you, the end user, about how MyBuys handles information we process on behalf of our retailer clients who use our service  to deliver a better user experience for you.  We collect personal information to use in delivering recommendations to you that match your interests.  We don\'t buy or sell your information.  We don\'t disclose it to third parties except to deliver our service.  And those third parties can only use the data for delivery of the service.  We do NOT collect sensitive information like credit card numbers.  We do not install software on users\' computers or track keystrokes.   For the full privacy policy, <a class="mbSDLink" href="http://www.mybuys.com/privacy.html" target="blank">click here</a>.',
	'whatsthisContent' : 'Throughout the site you can click buttons like this one to let us know what products you like. We\'ll look for items we think you\'ll love and follow up with you via email.<br>Just what you want. No junk. No kidding.<br>And opting out is fast and easy if you decide you\'re not interested anymore. Give it a try - we think you\'ll like it.',
	'oneclkForExistingSignup' : false,
	'ns' : null,
	'dataResponseCallback' : null,
	
	'el' : function(id)
	{
	  return document.getElementById(id);
	},
	/*
	 * All MyBuys' processing in the page is initiated by this function.  If there
	 * are signup link placements, they are properly initialzed and displayed.  If
	 * there are recommendation zones, the request to fill them is made.  If there
	 * are no recommendation zones, a "beacon" request is made.  The zone or beacon
	 * requests include all the context parameters provided to the mybuys object
	 * in the page.
	 *
	 * If the client and pagetype are not defined, no request will be made.
	 */
	'initPage' : function()
	{	if (!this.client) return;
		if (this.isIE6) return;
		this.deferInitPage();
		this.createConsumerAndSessionCookies();  
		if (!this.pagetype) return;
		this.getPageContext();
		this.collectOneClick();
		this.collectZones();
		this.traverseMBNodes();
		if (this.retrieveProductIds) this.retrieveProductIds();
		this.sendXMLRequest();
	},
	'collectOneClick' : function()
	{ var oneClickDiv = this.el(this.oneClickDivId);
		if (oneClickDiv)
		{ this.idBased = true;
			var htmlStr=mboneclk.rcBtnStr();
			var rcBtn=true;
			if(this.oneclkImgSrc)
			{
				htmlStr=mboneclk.imgStr();
				rcBtn=false;
			}
			else if(this.oneclkLinkLabel)
			{
				htmlStr=mboneclk.alinkStr();
				rcBtn=false;
			}
			oneClickDiv.innerHTML=htmlStr;
			mybuys.initOneclkSignupBtn(rcBtn);
		}
	},
	'collectZones' : function()
	{ if (!this.zonesEnabled) return;
		for (var zoneKey in this.zoneDivIds)
		{ var zdiv=this.el(this.zoneDivIds[zoneKey]);
			if (zdiv) this.addZone(zoneKey, zdiv);
		}
		var zoneKeys="";
		for (var z=0;z<this.zoneKeysToZoneDivIds.length;z++)
		{ if (!this.zoneKeysToZoneDivIds[z]) continue;
			if (zoneKeys != "") zoneKeys += ",";
			zoneKeys += z;
		}
		if (zoneKeys != "")
		{ this.idBased = true;
			this.params["wrz"]=zoneKeys;
		}
	},
	/*
	 * Use to override the default div id for one-click signup.
	 */
	'setOneClickDivId' : function(divId)
	{ this.oneClickDivId = divId;
		this.idBased = true;
	},
	/*
	 * Use to override the default zone div ids or to add more than the initial set (defined above).
	 */
	'setZoneDivId' : function(zoneKey, zoneDivId)
	{ this.zoneDivIds[zoneKey] = zoneDivId;
		this.idBased = true;
	},
	/*
	 * Examine the DOM to find signup link and recommendation zone placeholders.
	 */
	'traverseMBNodes' : function()
	{ if (this.idBased) return;
		var linkrxp=/\[_mbsignuplink_\]/;
		var imgrxp=/\[mbimgsrc\]/;
		var glinkrxp=/\[_mbsignuplink_\]/g;
		var gtokenrxp=/\[mbtoken\]/g;
		var mbbr=this.params["brandname"] || "";
		var mbkw=this.params["keywords"] || "";
		var mbcn=this.params["categoryname"] || "";
		var mbpn=this.params["productname"] || "";
		var mboos=this.params["notinstock"] || "";
		var els=document.getElementsByTagName("*");
		for (var m=0; m <els.length; m++)
		{	var elm=els[m];
			// 1. Signup links
			var mbid=elm.getAttribute("mbid");
			if (mbid)
			{
				var atext=elm.innerHTML;
				if (!linkrxp.test(atext)) continue;
				if (mboos.toLowerCase()=='y')
				{	var tplt=this.signupTemplates["ibis"];
					var imgsrc=this.signupImages["ibis"];
				}
				else
				{	var tplt=this.signupTemplates[mbid];
					var imgsrc=this.signupImages[mbid];
				}
				if (imgsrc) tplt=this.signupTemplates["imgtplt"].replace(imgrxp,imgsrc) + tplt;
				switch (mbid)
				{	case "search":
						var btext=tplt.replace(gtokenrxp,mbkw);
						break;
					case "brand":
						var btext=tplt.replace(gtokenrxp,mbbr);
						break;
					case "category":
						var btext=tplt.replace(gtokenrxp,mbcn);
						break;
					case "product":
					case "ibis":
						var btext=tplt.replace(gtokenrxp,mbpn);
						break;
					default:
						continue;
				}
				var ctext=atext.replace(glinkrxp,btext);
				elm.innerHTML=ctext;
				elm.style.display="inline";
				if(this.oneclkForExistingSignup)
				{	elm.href="javascript:void()";
					elm.className=null;
					elm.style.paddingBottom="3px";
					elm.onclick= function(){mybuys.checkSignedupEmail(this);return false;};
				}
			}
			// 2. webrec zone
			var zoneKey=elm.getAttribute("mybuyszone");
			if (zoneKey)
			{	var zoneKeyInt = parseInt(zoneKey);
				if (!isNaN(zoneKeyInt)&&zoneKeyInt>=0) this.addZone(zoneKeyInt, elm);
			}
			// 3. oneclick signup
			var oneclk=elm.getAttribute("mboneclk");
			if (oneclk)
			{	var htmlStr=mboneclk.rcBtnStr();
				var rcBtn=true;
				if(this.oneclkImgSrc)
				{
					htmlStr=mboneclk.imgStr();
					rcBtn=false;
				}
				else if(this.oneclkLinkLabel)
				{
					htmlStr=mboneclk.alinkStr();
					rcBtn=false;
				}
				elm.innerHTML=htmlStr;
				mybuys.initOneclkSignupBtn(rcBtn);
			}
		}
		// Set wr param
		var zoneKeys="";
		for (var z=0;z<this.zoneKeysToZoneDivIds.length;z++)
		{	if (!this.zoneKeysToZoneDivIds[z]) continue;
			if (zoneKeys != "") zoneKeys += ",";
			zoneKeys += z;
		}
		if (zoneKeys != "") this.params["wrz"]=zoneKeys;
	},
	/*
	 * This is a wrapper-function (aka hook) that we can instruct clients to put
	 * in their pages before the end of the body if they need to defer the
	 * call to initPage until onload or other time after the page has fully loaded.
	 *
	 * Everything that is done by this function needs to be safe to repeat.  In the
	 * normal case, this will not be called by client code.  It will always be called by
	 * initPage and so needs to be safe to do again when initPage is finally called.
	 * 
	 * This should do any document.write or similar actions that we need to do before
	 * the page is 'closed'.
	 */
	'deferInitPage' : function()
	{
		this.createContainer();
	},
	/*
	 * Because not all HTML pages are well-formed and IE has a low-tolerance
	 * for adding elements to the body root unless the page is well-formed,
	 * we need something we can put elements into safely.  The container
	 * is used for the image element for a beacon or a script element
	 * for a recommendations request.
	 */
	'createContainer' : function()
	{	this.mybuysContainer = document.getElementById("mybuyscontainer");
		if (!this.mybuysContainer)
		{	var container = document.createElement('span');
			container.id = 'mybuyscontainer';
			container.style.display = 'none';
			document.body.appendChild(container);
			this.mybuysContainer = document.getElementById("mybuyscontainer");
		}
	},

	'createConsumerAndSessionCookies' : function()
	{
		//consumer cookie
		var cck = this.getCookie("mbcc");
		if (cck == null)
		{
			this.setCookie('mbcc',this.randomUUID('-'),'1440000','/');
		}
		
		//device cookie
		var cdk = this.getCookie("mbdc");
		if (cdk == null)
		{
			this.setCookie('mbdc',this.randomUUID('.'),'1440000','/');
		}

		//session cookie
		var csk = this.getCookie("mbcs");
		if (csk == null)
		{
			this.setCookie('mbcs',this.randomUUID('-'),'30','/');
			this.ns = 1;
		} else 
		{
			this.setCookie('mbcs',csk,'30','/');
		}
	},
	/*
	 * Invoked from the client-specific setup.js recommendation zones are supported.
	 */
	'enableZones' : function()
	{	this.zonesEnabled = true;
	},
	'getPageContext' : function()
	{	var loc=window.location.href;
		if (loc.indexOf("?") < 0 || (loc.indexOf("mybuyscid") < 0 && loc.indexOf("green") < 0))
		{	this.mybuyscid="";
			return;
		}
		var idpos=(loc.indexOf("mybuyscid=")>0)?loc.indexOf("mybuyscid=")+10:loc.indexOf("green=")+6;
		var mybuyscid=loc.substring(idpos);
		var idposend=loc.indexOf("&",idpos);
		if (idposend > 0)
		{
			mybuyscid=loc.substring(idpos,idposend);
		}
		this.mybuyscid=mybuyscid;
		this.params["mybuyscid"]=mybuyscid;
	},
	/*
	 * Invoked from a script element within a page to specify the page type.
	 */
	'setPageType' : function(pagetype)
	{	if (this.pageTypeMap[pagetype])
		{	this.pagetype=pagetype;
			this.set("pt",this.pageTypeMap[pagetype]);
			this.applyStylesByPageType(pagetype);
		}
	},
	/*
	 * Set's the base of the URL used to make requests for recommendations.
	 */
	'setWebrecRoot' : function(root)
	{	this.webrecRoot=root;
	},
	/*
	 * Set's the base of the URL used to make requests for images.
	 */
	'setImgRoot' : function(root)
	{	this.imgRoot=root;
	},
	/*
	 * Set's the base of the URL used to make requests to sign up.
	 */
	'setSignupRoot' : function(signuproot)
	{	this.signupRoot=signuproot;
	},
	/*
	 * Invoked in the client-specific setup.js to specify the client identifier.
	 * This information is required and the library will not make requests
	 * to the MyBuys' servers without it.
	 */
	'setClient' : function(clientid)
	{	this.client=clientid;
	},
	/*
	 * Used to give the mybuys object values for most parameters.
	 */
	'set' : function(param, value)
	{	this.params[param.toLowerCase()]=value;
	},
	/*
	 * Used to give the mybuys object values used for an "organic" optin/optout.
	 */
	'setOptParam' : function(param, value)
	{	this.optParams[param.toLowerCase()]=value;
	},
	/*
	 * Used to specify values for stock-level/SKU filtering.
	 */
	'setStockCriteria' : function(categoryId, attributeName, attributeValue)
	{	this.set("scckc", categoryId);
		this.set("scattr", attributeName);
		this.set("scval", attributeValue);
	},
	/*
	 * Add attribute name and value for page context based filtering
	 * Attribute will be prefixed by "mbfa_" to avoid conflicts with other URL parameters
	 */
	'addFilteringAttribute' : function(attrName, attrValue)
	{
		this.params["mbfa_" + attrName] = attrValue;
	},
	/*
	 * Add attribute name and value for page context based filtering
	 * Attribute will be prefixed by "mbfa_" to avoid conflicts with other URL parameters
	 */
	'addConsumerAttribute' : function(attrName, attrValue)
	{
		this.params["cattr_" + attrName] = attrValue;
	},
	/*
	 * Specify information for one entry in the cart.  Should be
	 * invoked once per cart item.
	 */
	'addCartItemQtySubtotal' : function(id, quantity, subtotal)
	{	this.params["items"]=this.params["items"] || "";

		if (id && id != "")
		{
			if (this.params["items"] != "" )
			{
				this.params["items"] += ",";
			}
			
			this.params["items"] += '"'+this.embedQuote(id);
			if (quantity && quantity != "")
			{	this.params["items"] += "|" + quantity;
				if (subtotal && subtotal != "")	this.params["items"] += "|" + subtotal;
			}
			this.params["items"] += '"';
		}
	},
	/*
	 * Reset accumulated "cart" information
	 */
	'resetCart' : function(id, quantity, subtotal)
	{	this.params["items"] = "";
	},
	/*
	 * Specify information for one entry in an order.  Should be
	 * invoked once per order line item.
	 */
	'addOrderItemQtySubtotal' : function(id, quantity, subtotal)
	{	this.addCartItemQtySubtotal(id, quantity, subtotal);
	},
	/*
	 * Reset accumulated "cart" information
	 */
	'resetOrder' : function(id, quantity, subtotal)
	{	this.resetCart();
	},
	/*
	 * Invoked to indicate that there are additional items (other than the "primary"
	 * item like on a PDP) on the page.  May be used to ensure that these items are
	 * not used as recommendations or to help define the context of the page depending
	 * on the page type and specific zone configuration details.
	 */
	'addItemPresentOnPage' : function(id)
	{	var testDup = ","+this.onPageItemIds.join()+",";
		if ( testDup.indexOf(","+id+",") == -1 ) this.onPageItemIds.push(id);
	},
	/*
	 * If the client is unable to invoke addItemPresentOnPage in the page template,
	 * this function may be able to identify the additional items in the page by
	 * regular expression matching.
	 *
	 * This is invoked from the client-specific setup.js if appropriate.
	 */
	'retrieveProductIdsFromHrefs' : function(pattern, param)
	{
		this.setOnPageItemUrlPattern(pattern);
		this.setOnPageItemUrlParam(param);

		if ( !this.onPageItemUrlPattern || !this.onPageItemUrlParam) return;
		var urls = document.getElementsByTagName("A");

		var param1 =  "?"+this.onPageItemUrlParam+"=";
		var param2 =  "&"+this.onPageItemUrlParam+"=";

		var ids = {};
		for (var i=0; i<urls.length; i++)
		{	var url = urls[i].getAttribute("href");
			var pos1 = -1;
			var pos2 = -1;
			if(url==null || url.length==0) continue;
			if ( url.indexOf(this.onPageItemUrlPattern) >= 0 &&
				 ((pos1=url.indexOf(param1)) > 0 ||
				  (pos2=url.indexOf(param2)) > 0) )
			{
				// Retrieve product Id using pos1 or pos2 values, set it into id
				var id = null;
				var pos = (pos1>0)?pos1:pos2;

				url = url.substr(pos+param1.length);
				if ( (pos=url.indexOf("&")) == -1 )
				{
					id = url;
				}
				else
				{
					id = url.substr(0, pos);
				}

				if (id)
				{
					mybuys.addItemPresentOnPage(id);
				}
			}
		}
	},
	/*
	 * Define the regular expression for detecting product ids in the page.
	 */
	'setOnPageItemUrlPattern' : function(pattern)
	{	this.onPageItemUrlPattern = pattern;
	},
	/*
	 * Define the name of the product id param to extra product ids from query strings
	 */
	'setOnPageItemUrlParam' : function(param)
	{	this.onPageItemUrlParam = param;
	},
	'setSignup' : function(type, value)
	{	this.signupTemplates[type] = value;
	},
	'setSignupImage' : function(type, src)
	{	this.signupImages[type] = src;
	},
	/*
	 * Set the maximum time (in msecs) that a page will wait for recommendations
	 * to be returned.  After this time, the page gives up and will display
	 * "failover" images if one is defined.  If the default is not appropriate,
	 * this value is specified in the client-specific setup.js.
	 */
	'setFailOverMsecs' : function(msecs)
	{	this.failOverIntervalMsecs=(msecs)?msecs:1500;
	},
	'addFailOverImage' : function(pagetype,zone,imgurl)
	{	var foImages=this.failOverImages[pagetype];
		if (!foImages)
		{	foImages={};
			this.failOverImages[pagetype]=foImages;
		}
		if (foImages[zone])
			foImages[zone].push(imgurl);
		else
			foImages[zone]=[imgurl];
	},
	/*
	 * Used for client-side template rendering of a recommendation zone.  Invoked
	 * by the response to a request for recommendations.
	 */
	'assembleTemplate' : function(rowlist)
	{	if (rowlist=="all") rowlist=this.tparts.all;
		this.rowlist = rowlist;
		this.assembleTemplateString(rowlist);
	},
	'assembleTemplateString' : function(rowlist)
	{	if (!rowlist.join) rowlist=rowlist.split(",");
		var out="";
		for (var r=0;r<rowlist.length;r++)
		{	out += (this.tparts[rowlist[r]])?this.tparts[rowlist[r]]:"";
		}
		out=this.processTemplateString(this.tparts["mbitem"],{'mbitemhtml':out});
		this.templateString=out;
	},
	'isInAssembledTemplate' : function(key)
	{	var tempStr = ","+this.rowlist+",";
		return tempStr.indexOf(","+key+",") != -1;
	},
	'processTemplateString': function(p_template, p_context)
	{	var dp="|d$|";
		var fn = function(w, g)
		{	var value = p_context[g];
			if (value == null) return "";
			// For Mac Safari 2.0.4, when use regular expression to 
			// substitue parameter values, if price value starts with
			// $1 or $0, such as $113.99 or $0.23, the $0 and $1 will
			// be treated as arg1 and arg2, so in rendered string,
			// there will be "Price mblistprice13.99" displayed. In order
			// to fix it, replace "$" with other value, and restore it back
			// after regular expression is done.
			try 
			{	if (value.indexOf("$0")>=0||value.indexOf("$1")>=0)
				{
					value=value.replace("$", dp);
				}
			} catch (e)
			{	// Do nothing
			}
			return value;
		};

		p_template = p_template.replace(/%\(([A-Za-z0-9_|.-]*)\)/g, fn);
		while (p_template.indexOf(dp)>=0) { p_template=p_template.replace(dp, "$");}
		return p_template;
	},
	'repQuote': function(p_str)
	{	p_str=p_str.replace(/\'/g, "&lsquo;");
		return p_str.replace(/\"/g, "&quot;");
	},
	/*
	 * Used during the DOM-scan to define zones in the page.  If the zone doesn't have
	 * a defined id attribute, manufacture one that should be unique to accellerate
	 * later lookup speed.
	 */
	'addZone' : function(zoneKey, zoneDiv)
	{	if (this.zoneKeysToZoneDivIds[zoneKey]) return;
		var zoneDivId=zoneDiv.getAttribute("id");
		if (!zoneDivId)
		{	zoneDivId = "mybuyspagezone" + zoneKey;
			zoneDiv.setAttribute("id", zoneDivId);
		}
		this.zoneKeysToZoneDivIds[zoneKey]=zoneDivId;
	},
	/*
	 * Responsible for making the actual zone request by manipulating the DOM.
	 */
	'sendAsyncRequest' : function(url)
	{	if (this.mybuysContainer)
		{
			var mbscript=document.getElementById("mbTransportScript");
			if (mbscript) // For FF, have to remove it and recreate it again
			{	this.mybuysContainer.removeChild(mbscript);
			}
			mbscript=document.createElement("script");
			mbscript.setAttribute("type", "text/javascript");
			mbscript.setAttribute("id","mbTransportScript")
			mbscript.setAttribute("src",url);
			this.mybuysContainer.appendChild(mbscript);
		}
	},
	/*
	 * Send a beacon or zone request.  If a zone request, schedule the timeout to stop
	 * waiting for a response if it does not arrive promptly enough.  We don't usually use
	 * XML any more but the function name has stuck (and a few legacy implementations still
	 * use the XML protocol).
	 */
	'sendXMLRequest' : function()
	{	var mburl=this.getWebrecUrl();
		if (!this.zonesEnabled || !this.params["wrz"])
		{	
			if(this.params["noi"])
			{
				// make sure setup.js called this.set("noi",true);
				this.sendBeacon(mburl);
			}
			else
			{
				this.appendIFrame(mburl);
			}
			return;
		}
		this.sendAsyncRequest(mburl);
		this.renderOK=true;
		this.requestProcId=setTimeout("mybuys.cancelXMLRequest()",this.failOverIntervalMsecs);
	},
	/*
	 * Used in legacy (XML protocol) situations to process a response with zone content.  It is
	 * invoked as the last line of the zone content response.
	 */
	'readResponseXML' : function()
	{	if (!this.renderOK) return;
		var xDoc=this.createXMLDomFromString(this.responseXML);
		this.processXML(xDoc)
	},
	/*
	 * Zone content was not received in time, load any failover images.
	 */
	'cancelXMLRequest' : function()
	{	this.renderOK=false;
		//fill with zone-appropriate filler images
		for (var z=0;z<this.zoneKeysToZoneDivIds.length;z++)
		{	if (this.zoneKeysToZoneDivIds[z])
				this.loadFailoverImage(z);
		}
	},
	'loadFailoverImage' : function(zoneKey)
	{	var zoneDivId=this.zoneKeysToZoneDivIds[zoneKey];
		if (!zoneDivId) return;
		var zoneDiv=this.el(zoneDivId);
		if (!zoneDiv) return;
		var foImages=this.failOverImages[this.pagetype];
		if (!foImages) return;
		var f=foImages[zoneKey];
		if (f && f.join && f.length > 0)
		{	var ndx=Math.floor(Math.random() * f.length);
			var fimg=document.createElement("img");
			fimg.setAttribute("src",f[ndx])
			zoneDiv.appendChild(fimg);
		}
		else
			zoneDiv.innerHTML="";
	},
	/*
	 * Construct the URL used to make a beacon or zone content request.
	 */
	'getWebrecUrl' : function()
	{	var mburl=(this.isSecure)?this.webrecRoot.replace(/^http:/,"https:"):this.webrecRoot;
		mburl+="webrec/wr.do?";
		var mbts=new Date().getTime();
		mburl+="client=" + this.client;
		var mbcs=this.getCookie("mbcs");
		if (mbcs)
		{	mburl+="&sessionId="+mbcs;
			if (this.ns)
			{	mburl+="&ns="+this.ns;
			}
		}
		if (this.params["wrz"]) mburl+="&wrz="+this.params["wrz"];
		var pt=this.params["pt"] || "";
		var hasEmail=false;
		switch (pt) {
			case "cart":
			case "purchase":
				this.params["items"]=this.params["items"] || "";
				if (this.params["items"].join)
					this.params["items"]=this.params["items"].join(",");
				else
					this.params["items"]=this.params["items"];
			default:
				for (var p in this.params)
				{	try { if (typeof this.params[p] == 'function') continue; } catch(e) { continue; };
					if (p != "wrz")
					{	mburl += "&";
						mburl += (this.paramMap[p])?this.paramMap[p]:p;
						mburl += "=" + encodeURIComponent(this.params[p]);
					}
					if (p == "email")
					{	hasEmail=true;
					}
				}
				break;
		}
		
		var mboptin=this.getCookie("mboptin");
		if (mboptin)
		{	
			if (!hasEmail)
			{	mburl+="&"+this.paramMap["email"]+"="+mboptin;
			}
			this.eraseCookie("mboptin");
		}

		if (this.onPageItemIds.length > 0)
		{
			var item = "&pips=" + this.onPageItemIds[0];
			if ((mburl.length + item.length) <= 2000) mburl += item;

			for (var i=1; i < this.onPageItemIds.length; i++)
			{
				item = "," + this.onPageItemIds[i];
				if ((mburl.length + item.length) <= 2000) mburl += item;
			}
		}

		var mbcc=this.getCookie("mbcc");
		if (mbcc)
		{	mburl+="&mbcc="+mbcc;
		}
		var mbdc=this.getCookie("mbdc");
		if (mbdc)
		{	mburl+="&mbdc="+mbdc;
		}
		if (this.isSecure)
		{ mburl += "&bhttp=1";
		}		
		mburl += "&lang="+this.language;
		mburl += "&v4="+this.version;
		mburl += "&mbts="+mbts;
		if (document.referrer)
		{	var rf="&rf="+encodeURIComponent(document.referrer);
			if ((mburl.length + rf.length) <= 2000) mburl += rf;
		}
		var pageUrl="&purl="+encodeURIComponent(window.location.href);
		if ((mburl.length + pageUrl.length) <= 2000) mburl += pageUrl;
		return mburl;
	},
	/*
	 * Assemble the parameters provided to the mybuys object into a query string.
	 */
	'assembleParams' : function()
	{	var params="";
		for (var p in this.params)
		{	try { if (typeof this.params[p] == 'function') continue; } catch(e) { continue; };
			if(p=="notinstock")
			{	var subtype=(this.params[p].toLowerCase()=="y")?"IBIS":"NA";
				params += "&subType="+subtype;
			} else
			{	params += "&";
				params += (this.paramMap[p])?this.paramMap[p]:p;
				params += "=" + encodeURIComponent(this.params[p]);
			}
		}
		params += "&lang="+this.language;
		params += "&v4="+this.version;
		return params;
	},
	/*
	 * Create the string used to check for whether the consumer is signed up already when clicking
	 * a signup link.
	 */
	'getCheckSignupUrl' : function()
	{	var mburl=(this.isSecure)?this.webrecRoot.replace(/^http:/,"https:"):this.webrecRoot;
		mburl+="webrec/signup.do?method=check";
		mburl+="&client=" + this.client;
		mburl+=this.assembleParams();
		return mburl;
	},
	/*
	 * Create the string used to submit a new signup.
	 */
	'getOneclkSignupUrl' : function(oldEmail)
	{	var mburl=(this.isSecure)?this.webrecRoot.replace(/^http:/,"https:"):this.webrecRoot;
		mburl+="webrec/signup.do?method=signup";
		mburl+="&client=" + this.client;
		if (oldEmail!=null)
		{	mburl += "&old="+encodeURIComponent(oldEmail);
		}
		mburl+=this.assembleParams();
		return mburl;
	},
	/*
	 * Enable one-click signup for this client.  Invoked in the client-specific setup.js script.
	 */
	'useOneclkForExistingSignup' : function(flag)
	{	this.oneclkForExistingSignup=flag;
	},
	/*
	 * Create the URL for an organic optin/optout request
	 */
	'assembleOptParams' : function(bOptIn)
	{	var mburl=(this.isSecure)?this.webrecRoot.replace(/^http:/,"https:"):this.webrecRoot;
		mburl+="webrec/" + (bOptIn?"orgOptin":"orgOptout") + ".do?";
		mburl+="client=" + this.client;
		for (var k in this.optParams)
		{	try { if (typeof this.optParams[k] == 'function') continue; } catch(e) { continue; };
			mburl += "&"
			mburl += (this.optParamMap[k])?this.optParamMap[k]:("flx_"+k);
			mburl += "=" + encodeURIComponent(this.optParams[k]);
		}

		mburl += "&lang="+this.language;
		mburl += "&v4="+this.version;
		return mburl;
	},
	'getOptInUrl' : function()
	{	return this.assembleOptParams(true);
	},
	'getOptOutUrl' : function()
	{	return this.assembleOptParams(false);
	},
	/*
	 * Process the XML document and create the zone content from the templates.
	 */
	'processXML' : function(xDoc)
	{	var leftoverZones=[]
		for (var zk=0;zk<this.zoneKeysToZoneDivIds.length;zk++)
		{	if (this.zoneKeysToZoneDivIds[zk])
				leftoverZones[zk]=true;
		}
		var userNodes=xDoc.getElementsByTagName("mybuyscid");
		if (userNodes[0] && userNodes[0].firstChild)
		{	this.mybuyscid=userNodes[0].firstChild.nodeValue;
			this.params["mybuyscid"]=this.mybuyscid;
		}
		var zoneNodes=xDoc.getElementsByTagName("zone");
		for (var z=0; z<zoneNodes.length; z++)
		{	var zoneobj={}
			for (var a=0; a<zoneNodes[z].childNodes.length;a++)
			{	var nm = zoneNodes[z].childNodes[a].nodeName.toLowerCase();
				if (nm=="items" || nm.charAt(0)=="#") continue;
				if (zoneNodes[z].childNodes[a].firstChild)
					zoneobj[nm]=zoneNodes[z].childNodes[a].firstChild.nodeValue;
			}
			var items=zoneNodes[z].getElementsByTagName("item");
			zoneobj.itemarray=[];
			for (var i=0;i<items.length;i++)
			{	var item={};
				for (var j=0; j<items[i].childNodes.length; j++)
				{	var val=items[i].childNodes[j].firstChild;
					if (val && val.nodeValue)
						item[items[i].childNodes[j].nodeName]=this.repQuote(val.nodeValue);
				}
				zoneobj.itemarray.push(item);
			}
			this.renderZone(zoneobj);
			leftoverZones[zoneobj.zonekey]=false;
		}
		for (var zk=0;zk<leftoverZones.length;zk++)
		{	if (leftoverZones[zk])
				this.loadFailoverImage(zk);
		}
	},
	/*
	 * Client-side template final HTML assembly and injection into the waiting, empty, div.
	 */
	'renderZone' : function(zoneobj)
	{	var zoneDivId = this.zoneKeysToZoneDivIds[zoneobj.zonekey];
		if (!zoneDivId) return;
		var zoneDiv = document.getElementById(zoneDivId);
		if (zoneDiv)
		{	if (zoneobj.itemarray.length == 0)
			{	if (zoneobj.hideifempty=="true")
				{	zoneDiv.style.display="none";
					return;
				}
			}
			var row=zoneobj.itemarray.length;
			var rowcount=0;
			if (zoneobj.zonelayout) //defaults to horizontal
			{	if (zoneobj.zonelayout=="vertical") row=1;
				else
				{	var layoutparts=zoneobj.zonelayout.split(",")
					if (layoutparts[0]=="grid")
					{	row=layoutparts[1] || 1;
					}
				}
			}
			var itemhtml="<table cellpadding=0 cellspacing=0 border=0 class='mbzone'>"
			var ptimg = this.zoneTitleImage[this.pagetype];
			if ( ptimg )
			{
				ptimg = ptimg[zoneobj.zonekey];
			}
			if (zoneobj.zoneimg || zoneobj.zonetitle || ptimg)
			{	if (zoneobj.zoneimg || ptimg)
				{	var zimg = ptimg || zoneobj.zoneimg;
					var zoneimg=(this.isSecure)?zimg.replace(/^http:\/\/w\./,"https://t."):zimg;
					var zonelegend=this.processTemplateString(this.tparts["mbzoneimg"],{mbimgsrc:zoneimg});
				}
				else
					var zonelegend=zoneobj.zonetitle;
				var mbb=zoneobj.zonetitlealign || "";
				var znhead={mblegendcontent:zonelegend,"mba":row,"mbb":mbb}
				itemhtml+=this.processTemplateString( this.tparts["mbzonetitle"],znhead);
			}

			var mbpriceCenteralign = this.isInAssembledTemplate("mbpricecenteralign");
			var mbpriceInAssembledTemplate = this.isInAssembledTemplate("mbprice")||mbpriceCenteralign;
			var mbsaleCenteralign = this.isInAssembledTemplate("mbsalecenteralign");
			var mbsaleInAssembledTemplate = this.isInAssembledTemplate("mbsale")||mbsaleCenteralign;
			var mblistCenteralign = this.isInAssembledTemplate("mblistcenteralign");
			var mblistInAssembledTemplate = this.isInAssembledTemplate("mblist")||mblistCenteralign;
			var mbdiscInAssembledTemplate = this.isInAssembledTemplate("mbdisc");

			for (var i=0;i<zoneobj.itemarray.length;i++)
			{   var item=zoneobj.itemarray[i];
				if (item.mbimgsrc)
				{   item.mbimgsrc=(this.isSecure)?item.mbimgsrc.replace(/http:\/\/w\./,"https://t."):item.mbimgsrc;
				}
				if (item.mbblingcontent)
				{   item.mbblingcontent=(this.isSecure)?item.mbblingcontent.replace(/http:\/\/w\./,"https://t."):item.mbblingcontent;
				}
				itemhtml += (rowcount==0)?"<tr><td valign='top'>":"<td valign='top'>";

				//
				var list = ","+this.rowlist+",";
				if (mbpriceInAssembledTemplate && (!item.mbpricevalue||item.mbpricevalue==""))
				{
					if (mbpriceCenteralign)
					{
						list = list.replace("mbpricecenteralign,", "");
					}
					else
					{
						list = list.replace("mbprice,", "");
					}
				}
				if (mbsaleInAssembledTemplate && (item.mbsalevalue==""||!item.mbsalevalue))
				{
					if (mbsaleCenteralign)
					{
						list = list.replace("mbsalecenteralign,", "");
					}
					else
					{
						list = list.replace("mbsale,", "");
					}
				}
				if (mblistInAssembledTemplate && (item.mblistvalue==""||!item.mblistvalue))
				{

					if (mblistCenteralign)
					{
						list = list.replace("mblistcenteralign,", "");
					}
					else
					{
						list = list.replace("mblist,", "");
					}
				}
				if (mbdiscInAssembledTemplate && (item.mbdiscvalue==""||!item.mbdiscvalue))
				{
					list = list.replace("mbdisc,", "");
				}

				if (mbsaleInAssembledTemplate && item.mbsalevalue && item.mbsalevalue!="" &&
					mblistInAssembledTemplate && (item.mblistvalue==""||!item.mblistvalue))
				{
					if (mbsaleCenteralign)
					{
						list = list.replace("mbsalecenteralign,", "mbpricecenteralign,");
					}
					else
					{
						list = list.replace("mbsale,", "mbprice,");
					}
					item.mbpricevalue = item.mbsalevalue;
				}
				else if ((mbsaleInAssembledTemplate || mblistInAssembledTemplate || mbpriceInAssembledTemplate) &&
						 (item.mblistvalue==""||!item.mblistvalue)&&
						 (item.mbsalevalue==""||!item.mbsalevalue)&&
						 (item.mbpricevalue==""||!item.mbpricevalue))
				{
					list += ",mbprice,";
					item.mbpricevalue = this.altValueForZeroPrice;
				}
				list = list.substr(1, list.length-2);
				this.assembleTemplateString(list);

				itemhtml += this.processTemplateString(this.templateString,item);
				rowcount++;
				if (rowcount==row)
				{   itemhtml += "</td></tr>";
					rowcount=0;
				}
				else itemhtml += "</td>";
			}
			itemhtml += (rowcount==0)?"</table>":"</tr></table>";
			zoneDiv.innerHTML=itemhtml;
		}
	},
	/*
	 * Process a server-side template response.  Basically take
	 * the HTML received and insert into the appropriate div
	 * based on the zone keys.
	 */
	'processResponseHTML' : function(zoneHtmls)
	{	
		if (!this.renderOK) return;
		var leftoverZones=[]
		for (var zk=0;zk<this.zoneKeysToZoneDivIds.length;zk++)
		{	if (this.zoneKeysToZoneDivIds[zk])
				leftoverZones[zk]=true;
		}
		for (zonekey in zoneHtmls)
		{	try { if (typeof zoneHtmls[zonekey] == 'function') continue; } catch(e) { continue; };
			var zoneDivId = this.zoneKeysToZoneDivIds[zonekey];
			if (!zoneDivId) continue;
			var zoneDiv = this.el(zoneDivId);
			if (zoneDiv)
			{
				zoneDiv.innerHTML=zoneHtmls[zonekey];
				leftoverZones[zonekey]=false;
			}
		}
		for (var zk=0;zk<leftoverZones.length;zk++)
		{	if (leftoverZones[zk])
				this.loadFailoverImage(zk);
		}
	},
	/*
	 * Process a server-side template response. Basically take
	 * the zonesData received and invoke the callback function
	 * defined by client which should render the data in its
	 * desired presentation format.
	 */
	'processDataResponse' : function(dataRes)
	{
		if (this.dataResponseCallback)
		{
			try 
			{
				this.dataResponseCallback(dataRes);
			} catch(e) {}
		}
	},
	/*
	 * "Track" a click on a recommendation (i.e. send a beacon)
	 */
	'track' : function(url)
	{	if (url)
		{	var beaconURL=(this.isSecure)?url.replace(/http:/,"https:"):url;
			this.sendBeacon(beaconURL);
		}
	},
	'handlePriceItemSelector' : function(selector, propname, propvalue)
	{
		if (selector==".mblistrowleft"||selector==".mblistrowright"||
			selector==".mbsalerowleft"||selector==".mbsalerowright"||
			selector==".mbpricerowleft"||selector==".mbpricerowright"||
			selector==".mbdiscrowleft"||selector==".mbdiscrowright")
		{	var args = arguments;
			var len = arguments.length;
			var css = {};
			this.setters[selector]=this.setters[selector] || {};
			for (var s=1;s<len;s++)
			{	css[args[s]]=args[s+1];
				this.setters[selector][args[s]]=args[s+1];
				s++;
			};
			this.loadCSS(selector, css);
			return true;
		}
		else
		{
			return false;
		}
	},
	/*
	 * Set a "style" override values.
	 */
	'setStyle' : function(selector, propname, propvalue)
	{
		var bpriceitem = selector==".mblistrowleft"||selector==".mblistrowright"||
						selector==".mbsalerowleft"||selector==".mbsalerowright"||
						selector==".mbpricerowleft"||selector==".mbpricerowright"||
						selector==".mbdiscrowleft"||selector==".mbdiscrowright";
		var args = arguments;
		var len = arguments.length;
		var css = {};
		this.setters[selector]=this.setters[selector] || {};
		for (var s=1;s<len;s++)
		{	this.setters[selector][args[s]]=args[s+1];
			if(bpriceitem)
			{
				css[args[s]]=args[s+1];
			}
			s++;
		};
		if(bpriceitem)
		{
			this.loadCSS(selector, css);
		}

		/*
		if (!this.handlePriceItemSelector.apply(this,arguments))
		{
			var args = arguments;
			var len = arguments.length;
			this.setters[selector]=this.setters[selector] || {};
			for (var s=1;s<len;s++)
			{	this.setters[selector][args[s]]=args[s+1];
				s++;
			};
		}
		*/
	},
	/*
	 * Invoked by the client-specific setup.js if it has overridden any of the default MyBuys CSS.
	 */
	'applyStyles' : function()
	{	if (this.isIE6) return;
		this.docHead().appendChild(this.getStyleTagString(this.setters));
	},
	/*
	 * Override a MyBuys default style but only for a specific page type.
	 */
	'setStyleByPageType' : function(pagetype, selector, propname, propvalue)
	{	var args = arguments;
		var len = arguments.length;
		this.settersByPageType[pagetype]=this.settersByPageType[pagetype] || {};
		this.settersByPageType[pagetype][selector]=
			this.settersByPageType[pagetype][selector] || {};
		for (var s=2;s<len;s++)
		{	this.settersByPageType[pagetype][selector][args[s]]=args[s+1];
			s++;
		};
	},
	/*
	 * Apply the pagetype-specific style override.
	 */
	'applyStylesByPageType' : function(pagetype)
	{	if (this.settersByPageType[pagetype])
		{	if (this.isIE6) return;
			this.docHead().appendChild(this.getStyleTagString(this.settersByPageType[pagetype]));
		}
	},
	'getStyleTagString' : function(setters)
	{	var styleout_tag = document.createElement('style'),
		styleout = '';
		styleout_tag.type = 'text/css';
		if (setters)
		{
			var compsel;
			for (var selector in setters)
			{	try { if (typeof setters[selector] == 'function') continue; } catch(e) { continue; };
				for (var s in setters[selector])
				{	try { if (typeof setters[selector][s] == 'function') continue; } catch(e) { continue; };
					if (selector != compsel)
					{	styleout += selector + "{ ";
						compsel=selector;
					}
					var sn=s;
					if (s=="float") sn=(this.isIE)?"styleFloat":"cssFloat";
					styleout += sn + ":" + setters[selector][s] + ";";
				}
				styleout += "} ";
			}
		}
		if(this.isIE === true)
		{	styleout_tag.styleSheet.cssText = styleout;
		}
		else
		{	styleout_tag.innerHTML = styleout;
		}
		return styleout_tag;
	},
	'loadCSS' : function(selector, attrs)
	{	return true;
		var x,z,w,s;
		for (z=0;z<document.styleSheets.length;z++)
		{   
			if (mybuys.isIE)
			{	try
				{ var cssrules = document.styleSheets[z].rules;
				}
				catch(e)
				{	continue;
				}
			}
			else
			{	try
				{ var cssrules = document.styleSheets[z].cssRules;
				}
				catch(e)
				{	continue;
				}
			}
			if (!cssrules) {
				continue;
			}
			cssloop:			
			for (x=0;x<cssrules.length;x++)
			{	try
				{	if (cssrules[x].selectorText==selector )
					{	if (attrs=="clear")
						{	var style=cssrules[x].style;
							for (w in style)
							{	try { if (typeof style[w] == 'function') continue; } catch(e) { continue; };
								try {style[w]=""} catch(e){};
							}
							continue;
						}
						for (s in attrs)
						{	try { if (typeof attrs[s] == 'function') continue; } catch(e) { continue; };
							var sn=s;
							if (s=="float") sn=(mybuys.isIE)?"styleFloat":"cssFloat";
							try { cssrules[x].style[sn]=attrs[s] } catch(e) { return false };
						}
					}
				}
				catch(e)
				{	continue cssloop;
				}
			}
		}
		return true;
	},
	/*
	 * Parse the XML returned for a legacy recommendations request.
	 */
	'createXMLDomFromString' : function(txt)
	 {   //code for IE
		if (window.ActiveXObject)
		{   xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.loadXML(txt);
		}
		// code for Mozilla, Firefox, Opera, etc.
		else if (document.implementation && document.implementation.createDocument)
		{   var oParser=new DOMParser();
			var xmlDoc=oParser.parseFromString(txt,"text/xml");
		}
		else
		{	//browser cannot handle this script
			return null;
		}
		if (xmlDoc.firstChild && xmlDoc.firstChild.nodeName=="parsererror")
		{   //Error occured - uncomment for debugging
			//alert(p_xml_dom_id + " error parsing " + txt + " for " + p_xml_dom_id);
			return null;
		}
		var docNode = this.getXMLFirstChild(xmlDoc)
		if (docNode) return docNode;
		return xmlDoc;
	},
	'getXMLFirstChild' : function(p_node)
	{   if (p_node && p_node.childNodes)
		{	var a=p_node.childNodes;
			for (var x=0;x<a.length; x++)
			{   if (a[x].nodeName.charAt(0)=="#") continue;
				return a[x];
			}
		}
		return null;
	},
	/*
	 * Send a beacon.  Specifically, use our container to hold
	 * an img element that will cause the beacon request to be sent.
	 */
	'sendBeacon' : function(mburl)
	{	var mbimg=this.el("mbbeacon");
		if (mbimg)
		{	mbimg.setAttribute("src",mburl);
		}
		else
		{	var mbimg=document.createElement("img")
			mbimg.setAttribute("id","mbbeacon");
			mbimg.style.display="none";
			mbimg.setAttribute("height","1");
			mbimg.setAttribute("width","1");
			mbimg.setAttribute("src",mburl);
			if (this.mybuysContainer) this.mybuysContainer.appendChild(mbimg);
		}
	},
	/*
	 * Create an IFrame.  Specifically, use our container to hold
	 * an IFrame that will cause the beacon request to be sent.
	 */
	'appendIFrame' : function(mburl)
	{	var mbframe=this.el("mbframe");
		if (mbframe)
		{	mbframe.setAttribute("src",mburl);
		}
		else
		{	var mbframe=document.createElement("iframe")
			mbframe.setAttribute("id","mbframe");
			mbframe.style.display="none";
			mbframe.setAttribute("height","0");
			mbframe.setAttribute("width","0");
			mbframe.setAttribute("src",mburl);
			if (this.mybuysContainer) this.mybuysContainer.appendChild(mbframe);
		}
	},
	/*
	 * Invoked when an old-style search signup link is clicked.
	 */
	'searchSignup' : function()
	{	var mbkw=this.params["keywords"] || "";
		var wf="status=no,toolbar=no,menubar=no,scrollbars=no";
		var mburl=this.signupRoot+"rs_consumer/signup.do?method=load&clientId="+this.client+"&subType=KS&ss=1";
		mburl+=(mbkw)?"&keyword="+encodeURIComponent(mbkw):"";
		if (this.mybuyscid) mburl+="&green="+this.mybuyscid;
		window.open(mburl,'mbsignup', wf);
	},
	/*
	 * Invoked when an old-style brand signup link is clicked.
	 */
	'brandSignup' : function()
	{	var mbbr=this.params["brandname"] || "";
		var wf="status=no,toolbar=no,menubar=no,scrollbars=no";
		var mburl=this.signupRoot+"rs_consumer/signup.do?method=load&clientId="+this.client+"&subType=NA&ss=1";
		mburl+=(mbbr)?"&bnm="+encodeURIComponent(mbbr):"";
		if (this.mybuyscid) mburl+="&green="+this.mybuyscid;
		window.open(mburl,'mbsignup', wf);
	},
	/*
	 * Invoked when an old-style category signup link is clicked.
	 */
	'categorySignup' : function()
	{	var mbci=this.params["categoryid"] || "";
		var wf="status=no,toolbar=no,menubar=no,scrollbars=no";
		var mburl=this.signupRoot+"rs_consumer/signup.do?method=load&clientId="+this.client+"&subType=NA&ss=1";
		mburl+=(mbci)?"&ckc="+encodeURIComponent(mbci):"";
		if (this.mybuyscid) mburl+="&green="+this.mybuyscid;
		window.open(mburl,'mbsignup', wf);
	},
	/*
	 * Invoked when an old-style product signup link is clicked.
	 */
	'productSignup' : function()
	{	var mboos=this.params["notinstock"] || "n";
		var mbpi=this.params["productid"] || "";
		var wf="status=no,toolbar=no,menubar=no,scrollbars=no";
		var subtype=(mboos.toLowerCase()=="y")?"IBIS":"NA";
		var mburl=this.signupRoot+"rs_consumer/signup.do?method=load&clientId="+this.client+"&subType="+subtype+"&ss=1";
		mburl+=(mbpi)?"&productCode="+encodeURIComponent(mbpi):"";
		if (this.mybuyscid) mburl+="&green="+this.mybuyscid;
		window.open(mburl,'mbsignup', wf);
	},
	'setZoneTitleImage' : function(pagetype, zonekey, src)
	{
		if ( !this.zoneTitleImage[pagetype] )
		{
			this.zoneTitleImage[pagetype] = {};
		}
		this.zoneTitleImage[pagetype][zonekey] = src;
	},
	'setAltValueForZeroPrice' : function(val)
	{   this.altValueForZeroPrice = val;
	},
	/*
	 * Invoked by client script for a organic opt-in.
	 */
	'registerConsumerEmail' : function()
	{   if (!this.mybuysContainer) {
			return;
		}

		if (this.optParams["email"])
		{
			// Save in a cookie to ensure we get to send it in case
			// the page is replaced too quickly.
			this.setCookie("mboptin", this.optParams["email"], 525600);
		}
		this.sendBeacon(this.getOptInUrl());
	},
	/*
	 * Invoked by client script for an organic opt-out.
	 */
	'unregisterConsumerEmail' : function()
	{   if (!this.mybuysContainer) {
			return;
		}

		this.sendBeacon(this.getOptOutUrl());
	},
	/*
	 * Add behavior to the onsubmit event handler.
	 */
	'hookupOptOnsubmit' : function (fm, optFunc) {
		var fmos=fm.onsubmit;

		if (fmos) {
			fm.onsubmit = function() {
				if (fmos.apply(fm,arguments)) {
					optFunc();
					return true;
				} else {
					return false;
				}
			}
		} else {
			fm.onsubmit = function() {
				optFunc();
				return true;
			}
		}
	},
	/*
	 * Cookie domain is where this library was served from.
	 */
	'setCookie' : function (ckname,ckvalue,expiredays,path)
	{	var today = new Date();
		today.setTime( today.getTime() );
		if ( expiredays )
		{
			expiredays = expiredays * 1000 * 60;
		}
		var expires_date = new Date( today.getTime() + expiredays );
		var rootdomain = "web001.uno-west1.mybuystest.com";
		// set cookie using the domain after first "." if there are more than one "."
		var fdot = rootdomain.indexOf(".");
		if (fdot != -1) {
			var sdot = rootdomain.indexOf(".", fdot+1);
			if (sdot != -1) {
				rootdomain = rootdomain.substring(fdot+1);
			}
		}	
	},
	/*
	 * Can only access cookies from domain where this library was served.
	 */
	'getCookie' : function (ckname)
	{
		if (document.cookie.length>0)
		{
			var c_start=document.cookie.indexOf(ckname + "=");
			if (c_start!=-1)
			{ 
				c_start=c_start + ckname.length+1; 
				var c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) 
				{	c_end=document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start,c_end));
			} 
		}
		return null;
	},
	'eraseCookie' : function (ckname) {
		this.setCookie(ckname,"",-1000);
	},
	/*
	 * String quoting support function.
	 */
	'embedQuote' : function (str) {
		str=""+str;
		str=str.replace(/"/g, '""');
		return str;
	},

	// One click signup
	'initOneclkSignupBtn' : function(rcBtn)
	{	if(rcBtn) 
		{	this.rcToggle(false);
			this.setOneclkSignupBtnWidth(this.rcSDWidth);
		}
	},

	'setOneclkSignupBtnWidth' : function(width)
	{	this.rcSDWidth=width;
		if(this.el("_mbRCBtnFrame")) this.el("_mbRCBtnFrame").style.width = ""+(this.rcSDWidth)+"px";
	},

	'setOneclkPrivacyPolicyContent' : function(content)
	{	this.privacyContent = content;
	},

	'setOneclkWhatsThisContent' : function(content)
	{	this.whatsthisContent = content;
	},

	'setOneclkButtonLabel' : function(label)
	{	this.rcBtnLabel = label;
	},

	'setOneclkButtonAlt' : function(alt)
	{	this.rcBtnAlt = alt;
	},

	'setSignedupEmail' : function(email)
	{	this.signedupEmail = email;
		if(this.oneclkEvtElem != null)
		{	this.rcShowSlidedown(this.oneclkEvtElem, true);
			this.oneclkEvtElem = null;
		}
	},
	
	'checkSignedupEmail' : function(evtElem)
	{	if (this.signedupEmail != null)
		{	this.rcShowSlidedown(evtElem, true);
		}else
		{	this.oneclkEvtElem = evtElem;
		}
		this.sendAsyncRequest(this.getCheckSignupUrl());
	},

	'setOneclkSignupAsImg' : function(src)
	{	this.oneclkImgSrc=src;
	},

	'setOneclkSignupAsLink' : function(label, alt)
	{	this.oneclkLinkLabel=label;
		this.oneclkLinkAlt=alt||this.oneclkLinkAlt;
	},

	'setOneclkIconImg' : function(src, w, h)
	{	if(src)
		{	this.oneclkIconImgSrc=src;
			this.oneclkIconImgWidth=w||10;
			this.oneclkIconImgHeight=h||9;
		}else
		{	this.oneclkIconImgSrc="";
		}
	},
	
	'setOneclkThankYouText' : function(txt)
	{	this.rcThxMsg=txt;
	},

	'setOneclkSubmitBtnLabel' : function(label)
	{	this.rcSubmitBtnLabel=label;
	},

	'setOneclkCancelBtnLabel' : function(label)
	{	this.rcCancelBtnLabel=label;
	},

	'setOneclkPrivacyLinkLabel' : function(label)
	{	this.rcPrivacyLinkLabel=label;
	},

	'setOneclkWhatsThisLinkLabel' : function(label)
	{	this.rcWhatsThisLinkLabel=label;
	},
	'setDataResponseCallback' : function(funcName)
	{
		this.dataResponseCallback=funcName;
	},
	'rcShowSlidedown' : function(btn, flag)
	{
		this.rcCrtBtn = btn;
		var sd=this.el("_mbrcslidedown");
		if (!sd)
		{
			sd=document.createElement("div");
			sd.setAttribute("id", "_mbrcslidedown");
			sd.className="mbSDOuterLayer";
			document.body.appendChild(sd);
			sd.innerHTML = mboneclk.sdPanelStr();

			if (this.isIE) {
			  window.attachEvent("onresize", mybuys.rcSyncPos);
			  window.attachEvent("onscroll",   mybuys.rcSyncPos);
			} else {
			  window.addEventListener("resize", mybuys.rcSyncPos,   true);
			  window.addEventListener("scroll",   mybuys.rcSyncPos, true);
			}
		}

		if (btn && flag)
		{
			this.rcSyncPos();
			sd.style.height="0px";
			sd.style.zIndex="1000";
			this.el("_mbemail").value=this.signedupEmail!=null?this.signedupEmail:this.rcDefEmail;
			sd.style.display="block";
			this.rcToggleSDPanel(this.signedupEmail==null);
			this.rcCrtHeight=0;
			this.rcSlidedown();
		}
		else
		{
		  sd.style.display="none";
		}
		this.el("_mbsdmore").style.display="none";
		this.rcToggle(false);
	},

	'rcSyncPos' : function()
	{
		if (mybuys.rcCrtBtn)
		{
			var sd=mybuys.el("_mbrcslidedown");
			var top=mybuys.getElementClientAreaTop(mybuys.rcCrtBtn);
			var left=mybuys.getElementClientAreaLeft(mybuys.rcCrtBtn);
			var width=mybuys.getElementClientAreaWidth(mybuys.rcCrtBtn);
			var height=mybuys.getElementClientAreaHeight(mybuys.rcCrtBtn);
			var sdwidth=width<mybuys.rcSDMinWidth?mybuys.rcSDMinWidth:width;
			sdwidth=sdwidth-2*mybuys.rcSDIndent;
			var sdleft=left;
			if (mybuys.oneclkLinkLabel || mybuys.oneclkImgSrc)
			{	top+=height;
			}
			else
			{	sdleft+=mybuys.rcSDIndent;
				top+=(height-2);
			}
			if (width<mybuys.rcSDMinWidth)
			{	var viewwidth=mybuys.getViewportSize().width;
				if((sdleft+sdwidth)>viewwidth)
				{	sdleft=left+width-sdwidth;
					if(!mybuys.oneclkLinkLabel && !mybuys.oneclkImgSrc) sdleft -= mybuys.rcSDIndent;
				}
				if((sdleft+sdwidth)>viewwidth) sdleft=viewwidth-sdwidth;
			}
			sd.style.left=""+sdleft+"px";
			sd.style.top=""+top+"px";
			sd.style.width=""+sdwidth+"px";
			mybuys.el("_mbemail").style.width = ""+(sdwidth-102)+"px";
		}
	},

	'rcSlidedown' : function()
	{
		if (this.rcCrtHeight<this.rcSDHeight)
		{
			var sd=this.el("_mbrcslidedown");
			if ((this.rcCrtHeight+this.rcHeightDelta)<=this.rcSDHeight) this.rcCrtHeight+=this.rcHeightDelta;
			else this.rcCrtHeight=this.rcSDHeight;
			sd.style.height=""+this.rcCrtHeight+"px";
			setTimeout("mybuys.rcSlidedown()", this.rcTimerInterval);
		}
	},

	'rcSlidedownMore' : function(type)
	{
		this.el("_mbsdprivacy").style.display=type=="privacy"?"block":"none";
		this.el("_mbsdwhatis").style.display=type!="privacy"?"block":"none";
		this.el("_mbsdmore").style.display="block";

		this.rcSDExtraHeight=type=="privacy"?this.getElementClientAreaHeight(this.el("_mbsdprivacy"))
			:this.getElementClientAreaHeight(this.el("_mbsdwhatis"));
		this.rcSDExtraHeight=parseInt(this.rcSDExtraHeight);

		var sd=this.el("_mbrcslidedown");
		this.rcCrtHeight=this.rcSDHeight+this.rcSDExtraHeight;
		sd.style.height=""+this.rcCrtHeight+"px";
	},

	'rcSDSubmit' : function()
	{	var em =this.el("_mbemail");
		var val = em.value;
		if(this.checkEmail(val))
		{
			this.set("email", val);
			var oldem=null;
			if (this.signedupEmail!=null && val!=this.signedupEmail) oldem=this.signedupEmail;
			this.sendBeacon(this.getOneclkSignupUrl(oldem));
			this.signedupEmail = val;
			this.set("email", null);
			this.rcToggleSDPanel(false);
		}else
		{	em.focus();	
		}
	},

	'rcToggle' : function(bOver)
	{	var sd=this.el("_mbrcslidedown");
		if(sd&&sd.style.display.toLowerCase()!="none") bOver=false;
		var bg=bOver?this.rcBgMOColor:this.rcBgColor;
		if(!this.oneclkLinkLabel && !this.oneclkImgSrc)
		{	this.el("_mbtoprc1").style.backgroundColor=bg;
			this.el("_mbtoprc2").style.backgroundColor=bg;
			this.el("_mbtoprc3").style.backgroundColor=bg;
			this.el("_mbtoprc4").style.backgroundColor=bg;
			this.el("_mbbtmrc4").style.backgroundColor=bg;
			this.el("_mbbtmrc3").style.backgroundColor=bg;
			this.el("_mbbtmrc2").style.backgroundColor=bg;
			this.el("_mbbtmrc1").style.backgroundColor=bg;
			this.el("_mbrctext").style.backgroundColor=bg;
			this.el("_mbrctext").style.color=bOver?this.rcTextMOColor:this.rcTextColor;
		}
	},

	'rcToggleSDPanel' : function(bShowSignup)
	{
		this.el("_mbsdthanku").style.display=!bShowSignup?"block":"none";
		this.el("_mbsdsignup").style.display=bShowSignup?"block":"none";
		this.el("_mbsdmore").style.display="none";
		this.el("_mbrcslidedown").style.height=""+this.rcSDHeight+"px";
		this.rcCrtHeight=this.rcSDHeight;
	},

	'rcResetEmail' : function(elem)
	{
		if (elem.value==this.rcDefEmail)
		{	elem.value="";
		}
	},

	'setOneclkTaupeStyle' : function()
	{
		//Taupe
		this.rcBgColor='#95856A';
		this.rcTextColor='#FFFFFF'
		this.rcBgMOColor='#B5A58A';
		this.rcTextMOColor='#FFFFFF';
		this.rcStdBtnBkColor="#95856A";
		this.rcStdBtnBkMOColor="#B5A58A";
		this.rcStdBtnLiteBkColor="#DED3C0";
		this.rcStdBtnLiteBkMOColor="#BFAE91";
		this.setStyle('table.mbSDInnerLayer', 'background-color', '#F9F9F9', 'border-left','1px solid #595A40', 'border-right', '1px solid #595A40', 'border-bottom', '1px solid #595A40', 'border-top', '1px solid #595A40');
		this.setStyle('table.mbSDInnerLayer td', 'background-color', '#F9F9F9');
		this.setStyle('button.mbSDBtn','color','#95856A');
		this.setStyle('a.mbSDLink:link','color','#645A48');
		this.setStyle('a.mbSDLink:hover','color','#645A48');
		this.setStyle('a.mbSDLink:visited','color','#645A48');
		this.setStyle('input.mbSDInput','border-color','#595A40','color','#202020');
		this.setStyle('button.mbSDBtn','background-color','#95856A','border-color','#95856A','color','#FFFFFF');
		this.setStyle('button.mbSDLiteBtn','background-color','#DED3C0','border-color','#DED3C0','color','#65553A');
		this.setStyle('div.mbSDText, div.mbSDBoldText','color','#202020');
		this.setStyle('td.mbSDText, td.mbSDBoldText','color','#202020');
	},

	'setOneclkOrangeStyle' : function()
	{
		//Orange
		this.rcBgColor='#FF9900';
		this.rcTextColor='#FFFFFF'
		this.rcBgMOColor='#FDB64C';
		this.rcTextMOColor='#FFFFFF';
		this.rcStdBtnBkColor="#FF9900";
		this.rcStdBtnBkMOColor="#FDB64C";
		this.rcStdBtnLiteBkColor="#FCDDA9";
		this.rcStdBtnLiteBkMOColor="#FCCE85";
		this.setStyle('table.mbSDInnerLayer', 'background-color', '#F7FAFF', 'border-left','1px solid #330000', 'border-right', '1px solid #330000', 'border-bottom', '1px solid #330000', 'border-top', '1px solid #330000');
		this.setStyle('table.mbSDInnerLayer td', 'background-color', '#F7FAFF');
		this.setStyle('button.mbSDBtn','color','#95856A');
		this.setStyle('a.mbSDLink:link','color','#224488');
		this.setStyle('a.mbSDLink:hover','color','#224488');
		this.setStyle('a.mbSDLink:visited','color','#224488');
		this.setStyle('input.mbSDInput','border-color','#595A40','color','#645A48');
		this.setStyle('button.mbSDBtn','background-color','#FF9900','border-color','#FF9900','color','#FFFFFF');
		this.setStyle('button.mbSDLiteBtn','background-color','#FCDDA9','border-color','#DED3C0','color','#993300');
		this.setStyle('div.mbSDText, div.mbSDBoldText','color','#224488');
		this.setStyle('td.mbSDText, td.mbSDBoldText','color','#224488');
	},

	'setOneclkBlueStyle' : function()
	{
		//Blue
		this.rcBgColor='#29678D';
		this.rcTextColor='#FFFFFF'
		this.rcBgMOColor='#7CAAD1';
		this.rcTextMOColor='#FFFFFF';
		this.rcStdBtnBkColor="#29678D";
		this.rcStdBtnBkMOColor="#5389AF";
		this.rcStdBtnLiteBkColor="#7CAAD0";
		this.rcStdBtnLiteBkMOColor="#5993BD";
		this.setStyle('table.mbSDInnerLayer', 'background-color', '#F9F9F9', 'border-left','1px solid #7CAAD1', 'border-right', '1px solid #7CAAD1', 'border-bottom', '1px solid #7CAAD1', 'border-top', '1px solid #7CAAD1');
		this.setStyle('table.mbSDInnerLayer td', 'background-color', '#F9F9F9');
		this.setStyle('button.mbSDBtn','color','#29678D');
		this.setStyle('a.mbSDLink:link','color','#17394E');
		this.setStyle('a.mbSDLink:hover','color','#17394E');
		this.setStyle('a.mbSDLink:visited','color','#17394E');
		this.setStyle('input.mbSDInput','border-color','#7F9DB9','color','#808080');
		this.setStyle('button.mbSDBtn','background-color','#29678D','border-color','#29678D','color','#FFFFFF');
		this.setStyle('button.mbSDLiteBtn','background-color','#7CAAD0','border-color','#7CAAD0','color','#17394E');
		this.setStyle('div.mbSDText, div.mbSDBoldText','color','#17394E');
		this.setStyle('td.mbSDText, td.mbSDBoldText','color','#17394E');
	},
	
	'rcToggleStdBtn' : function(evt, bOver)
	{	var elem=this.isIE?evt.srcElement:evt.target;
		if(elem.className=="mbSDBtn")
		{	elem.style.backgroundColor=bOver?this.rcStdBtnBkMOColor:this.rcStdBtnBkColor;
			elem.style.cursor=bOver?"pointer":"default";
		}else if(elem.className=="mbSDLiteBtn")
		{	elem.style.backgroundColor=bOver?this.rcStdBtnLiteBkMOColor:this.rcStdBtnLiteBkColor;
			elem.style.cursor=bOver?"pointer":"default";
		}
	},
	
	'getElementClientAreaTop' : function (elem)
	{
		var t = elem.offsetTop;
		tempElem = elem.offsetParent;
		while ( tempElem != null) {
			t += tempElem.offsetTop;
			tempElem = tempElem.offsetParent;
		}
		return t;
	},

	'getElementClientAreaLeft' : function (elem)
	{
		var l = elem.offsetLeft;
		tempElem = elem.offsetParent;
		while ( tempElem != null) {
			l += tempElem.offsetLeft;
			tempElem = tempElem.offsetParent;
		}
		return l;
	},

	'getElementClientAreaWidth' : function (elem)
	{
		return elem.offsetWidth;
	},

	'getElementClientAreaHeight' : function (elem)
	{
		return elem.offsetHeight;
	},
	
	'getViewportSize' : function()
	{
		var vpw,vph;
		if (typeof window.innerWidth != 'undefined')
		{	// (mozilla/netscape/opera/IE7)
			vpw = window.innerWidth;
			vph = window.innerHeight;
		}
		else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
		{	// IE6 in standards compliant mode
			vpw = document.documentElement.clientWidth;
			vph = document.documentElement.clientHeight;
		}
		else
		{	// older versions of IE
			vpw = document.getElementsByTagName('body')[0].clientWidth;
			vph = document.getElementsByTagName('body')[0].clientHeight;
		}
		return {width:vpw,height:vph};
	},
	
	/*
	 * Simple email address syntax check.
	 */
	'checkEmail' : function (val)
	{	var value = val.replace(/^\s+|\s+$/g,"");
		var emailfilter=/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
		var ret = emailfilter.test(value);
		if (ret==false)
		{
			alert("Please enter a valid email address.");
			return false;
		}else
		{
			return true;
		}
	},

	'switchToSecuredImgUrl' : function (url)
	{	if(this.isSecure && url.toLowerCase().indexOf("http://w.")!=-1)
		{	url=url.replace("http://w.","https://w.");
		}
		return url;
	},
	
	'randomUUID' : function(delim) {
		  var s = [];
		  var itoh = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F'];
		  now = new Date(); 
		 
		  // Make array of random hex digits. The UUID only has 32 digits in it, but we
		  // allocate an extra items to make room for the '-'s we'll be inserting.
		  for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random(now.getTime()) * 0x10);
		 
		  // Conform to RFC-4122, section 4.4
		  s[14] = 4;  // Set 4 high bits of time_high field to version
		  s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence
		 
		  // Convert to hex chars
		  for (var i = 0; i <36; i++) {
			  var idx = s[i];
			  var v = itoh[idx];
			  s[i] = v;
		  }
		 
		  // Insert '-'s
		  s[8] = s[13] = s[18] = s[23] = delim;
		 
		  return s.join('');
	}

}

mybuys.isSecure=false

mybuys.isIE=false;
mybuys.isIE6=false;
mybuys.isIE6=false;

//default signup templates
mybuys.setSignup("brand","Get [mbtoken] Alerts");
mybuys.setSignup("category","Get [mbtoken] Alerts");
mybuys.setSignup("product","Get [mbtoken] Alerts");
mybuys.setSignup("search","Get [mbtoken] Alerts");
mybuys.setSignup("ibis","Alert me when [mbtoken] arrives");

mybuys.setSignup("imgtplt",'<img src="[mbimgsrc]" alt="" style="vertical-align: middle; padding-right: 3px;" border="0">');

mybuys.tparts["all"]="mbbling,mbimage,mbbrand,mbmore,mbname,mbprice,mbsale,mbdisc,mblist,mbpromotion";

mybuys.tparts["mbzonetitle"]='<tr><td colspan="%(mba)" align="%(mbb)" class="mblegend">%(mblegendcontent)</td></tr>';

mybuys.tparts["mbzoneimg"]='<img border=0 src="%(mbimgsrc)" align="absmiddle">';

mybuys.tparts["mbitem"]='<div class="mbitem">%(mbitemhtml)</div>';

mybuys.tparts["mbbling"]='<span class="mbblingrowspan"><span class="mbbling"><a class="mbblinglink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbblingcontent)</a></span></span>';

mybuys.tparts["mbimage"]='<span class="mbrowspan"><span class="mbimgspan"><a class="mbimglink" href="%(mbitemlink)"><img class="mbimg" height="%(mbimgh)" width="%(mbimgw)" alt="%(mbitemname)" onmousedown="mybuys.track(\'%(mbitembeacon)\')" src="%(mbimgsrc)"></a></span></span>';

mybuys.tparts["mbbrand"]='<span class="mbbrandrowspan"><a class="mbbrandlink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbbrandcontent)</a></span>';

mybuys.tparts["mbmore"]='<span class="mbmorerowspan"><a class="mbmorelink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbmorecontent)</a></span>';

mybuys.tparts["mbname"]='<span class="mbnamerowspan"><a class="mbnamelink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbitemname)</a></span>';

mybuys.tparts["mbprice"]='<span class="mbpricerowspan"><span class="mbpricerowleft"><a class="mbpricelink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbpricecontent)</a>&nbsp;</span><span class="mbpricerowright"><a class="mbpricelink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbpricevalue)</a></span></span>';

mybuys.tparts["mbpricecenteralign"]='<span class="mbpricerowspan"><span><a class="mbpricelink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbpricecontent)</a>&nbsp;</span><span><a class="mbpricelink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbpricevalue)</a></span></span>';

mybuys.tparts["mbsale"]='<span class="mbsalerowspan"><span class="mbsalerowleft"><a class="mbsalelink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbsalecontent)</a>&nbsp;</span><span class="mbsalerowright"><a class="mbsalelink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbsalevalue)</a></span></span>';

mybuys.tparts["mbsalecenteralign"]='<span class="mbsalerowspan"><span><a class="mbsalelink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbsalecontent)</a>&nbsp;</span><span><a class="mbsalelink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbsalevalue)</a></span></span>';

mybuys.tparts["mblistsale"]='<span class="mblistsalerowspan"><a class="mblistlink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mblistcontent)</a>&nbsp;<span class="mblist" >%(mblistvalue)</span>&nbsp;<a class="mbsalelink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbsalevalue)</a></span>';

mybuys.tparts["mblist"]='<span class="mblistrowspan"><span class="mblistrowleft"><a class="mblistlink" style="text-decoration:none" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mblistcontent)</a>&nbsp;</span><span class="mblistrowright"><a class="mblistlink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mblistvalue)</a></span></span>';

mybuys.tparts["mblistcenteralign"]='<span class="mblistrowspan"><span><a class="mblistlink" style="text-decoration:none" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mblistcontent)</a>&nbsp;</span><span><a class="mblistlink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mblistvalue)</a></span></span>';

mybuys.tparts["mbdisc"]='<span class="mbdiscrowspan"><span class="mbdiscrowleft"><a class="mbdisclink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbdisccontent)</a>&nbsp;</span><span class="mbdiscrowright"><span class="mbdisc">%(mbdiscvalue)</span></span></span>';

mybuys.tparts["mbpromotion"]='<span class="mbpromotionrowspan"><a class="mbpromotionlink" href="%(mbitemlink)" onmousedown="mybuys.track(\'%(mbitembeacon)\')">%(mbpromotioncontent)</a></span>'

//dynamically generate styles for price items list/sale/price instead of putting them in mybuys.css, cuz those styles cannot be overridden at run-time
if (!mybuys.isIE6)
mybuys.loadCSS(".mbsalerowleft",{'float':'left','textAlign':'left'});
mybuys.loadCSS(".mbsalerowright",{'float':'right','textAlign':'right'});
mybuys.loadCSS(".mblistrowleft",{'float':'left','textAlign':'left'});
mybuys.loadCSS(".mblistrowright",{'float':'right','textAlign':'right'});
mybuys.loadCSS(".mbpricerowleft",{'float':'left','textAlign':'left'});
mybuys.loadCSS(".mbpricerowright",{'float':'right','textAlign':'right'});
mybuys.loadCSS(".mbdiscrowleft",{'float':'left','textAlign':'left'});
mybuys.loadCSS(".mbdiscrowright",{'float':'right','textAlign':'right'});

// One click signup
var mboneclk =
{
	'alinkStr' : function()
	{	return '<a class="mboneclklink" href="javascript:void()" onclick="mybuys.checkSignedupEmail(this); return false;" alt="'+mybuys.oneclkLinkAlt+'" title="'+mybuys.oneclkLinkAlt+'">'+mybuys.oneclkLinkLabel+'</a>';
	},

	'imgStr' :  function()
	{	var imgsrc=mybuys.switchToSecuredImgUrl(mybuys.oneclkImgSrc);
		return '<img src="'+imgsrc+'" onclick="mybuys.checkSignedupEmail(this);" alt="'+mybuys.rcBtnAlt+'" title="'+mybuys.rcBtnAlt+'" style="cursor:hand; cursor:pointer">';
	},

	'rcBtnStr' : function()
	{	if(mybuys.oneclkIconImgSrc==null) //Default Y-guy
		{	mybuys.oneclkIconImgSrc=mybuys.imgRoot+'/clients/MASTER/images/Oneclick_icon.gif';
			mybuys.oneclkIconImgWidth=10;
			mybuys.oneclkIconImgHeight=9;
		}else if(mybuys.oneclkIconImgSrc=="") //1x1 pixel
		{	mybuys.oneclkIconImgSrc=mybuys.imgRoot+'/clients/MASTER/images/transparent_pixel.gif';
			mybuys.oneclkIconImgWidth=1;
			mybuys.oneclkIconImgHeight=1;
		}
		var imgsrc=mybuys.switchToSecuredImgUrl(mybuys.oneclkIconImgSrc);
		return '<div id="_mbRCBtnFrame" class="mbRCBox" style="width:250px" onclick="mybuys.checkSignedupEmail(this)" onmouseover="mybuys.rcToggle(true)" onmouseout="mybuys.rcToggle(false)" title="'+mybuys.rcBtnAlt+'">'+
		'<b class="mbRCTop"><b id="_mbtoprc1" class="mbRC1"></b><b id="_mbtoprc2" class="mbRC2"></b><b id="_mbtoprc3" class="mbRC3"></b><b id="_mbtoprc4" class="mbRC4"></b></b>'+
			'<table id="_mbsignuptxt" class="mbRCInnerBox" width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td id="_mbrctext" class="mbRCText">'+
				'&nbsp;&nbsp;<img src="'+imgsrc+'" width="'+mybuys.oneclkIconImgWidth+'" height="'+mybuys.oneclkIconImgHeight+'" style="vertical-align:center">&nbsp;'+mybuys.rcBtnLabel+
				'</td></tr>'+
			'</table>'+
		'<b class="mbRCBtm"><b id="_mbbtmrc4" class="mbRC4"></b><b id="_mbbtmrc3" class="mbRC3"></b><b id="_mbbtmrc2" class="mbRC2"></b><b id="_mbbtmrc1" class="mbRC1"></b></b>'+
	'</div>';
	},

	'sdPanelStr' :  function()
	{	return '<table class="mbSDInnerLayer" cellspacing="0" cellpadding="5" width="100%">'+
	'<tr>'+
		'<td onmouseover="mybuys.rcToggleStdBtn(event, true)" onmouseout="mybuys.rcToggleStdBtn(event, false)">'+
		'<div id="_mbsdthanku" style="display:">'+
			'<table cellspacing="0" cellpadding="5" width="100%" height="100%">'+
			  '<tr>'+
				'<td width="100%" class="mbSDBoldText">'+
				  mybuys.rcThxMsg +
				'</td>'+
				'<td align="right">'+
				  '<button class="mbSDBtn" onclick="mybuys.rcShowSlidedown(null, false)">CLOSE</button>'+
				'</td>'+
			  '</tr>'+
			  '<tr>'+
				'<td valign="top">'+
				  '<a class="mbSDLink" href="javascript:void(mybuys.rcToggleSDPanel(true));">Change Email</a><br>'+
				'</td>'+
				'<td valign="top">'+
				  '&nbsp;'+
				'</td>'+
			  '</tr>'+
			'</table>'+
		'</div>'+
		'<div id="_mbsdsignup" style="display:none">'+
			'<table cellspacing="0" cellpadding="5" width="100%" height="100%">'+
			  '<tr>'+
				'<td align="left">'+
				  '<input id="_mbemail" class="mbSDInput" value="" onfocus="mybuys.rcResetEmail(this)"/>'+
				'</td>'+
				'<td align="right">'+
				  '<button class="mbSDBtn" onclick="mybuys.rcSDSubmit()">'+mybuys.rcSubmitBtnLabel+'</button>'+
				'</td>'+
			  '</tr>'+
			  '<tr>'+
				'<td valign="top">'+
				  '<a class="mbSDLink" href="javascript:void(mybuys.rcSlidedownMore(\'privacy\'));">'+mybuys.rcPrivacyLinkLabel+'</a><br>'+
				  '<a class="mbSDLink" href="javascript:void(mybuys.rcSlidedownMore(\'what\'));">'+mybuys.rcWhatsThisLinkLabel+'</a>'+
				'</td>'+
				'<td valign="top" align="right">'+
				  '<button class="mbSDLiteBtn" onclick="mybuys.rcShowSlidedown(null, false)">'+mybuys.rcCancelBtnLabel+'</button>'+
				'</td>'+
			  '</tr>'+
			'</table>'+
		'</div>'+
		'<div id="_mbsdmore" style="display:none">'+
		  '<div id="_mbsdprivacy" class="mbSDText" style="display:none">'+mybuys.privacyContent+
		  '</div>'+
		  '<div id="_mbsdwhatis" class="mbSDText" style="display:none">'+mybuys.whatsthisContent+
		  '</div>'+
		'</div>'+
	  '</td>'+
	'</tr>'+
  '</table>';
  }
};
