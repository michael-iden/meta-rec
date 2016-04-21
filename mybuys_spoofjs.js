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
	'zoneKeysToZoneDivIds' : [],
	'idBased' : false,
	'oneClickDivId' : 'mboneclk',
	
		'switchToSecuredImgUrl' : function (url)
	{	if(this.isSecure && url.toLowerCase().indexOf("http://w.")!=-1)
		{	url=url.replace("http://w.","https://w.");
		}
		return url;
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
	'track' : function(url)
	{	if (url)
		{	var beaconURL=(this.isSecure)?url.replace(/http:/,"https:"):url;
			this.sendBeacon(beaconURL);
		}
	},
}	
