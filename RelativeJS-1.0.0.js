class RelativeJS {
	constructor() {
		var template=document.body.parentElement.outerHTML;
		var data={};
		var lists={};
		var getTemp=()=>{
			return template;
		}
		var updatePage=()=>{
			var temp=template;
			var temp=treateLoop(lists);
			var d=Object.entries(data)
			d.forEach((i)=>{
				temp=temp.replaceAll("{{"+i[0]+"}}",i[1]);
			});
			temp=treateIf(temp);
			document.body.outerHTML=temp;
		}
		var treateLoop=(context)=>{
			/* Get the HTML content as a string */
			let html = template;

			/* Handle loops using the {% for %} ... {% endfor %} syntax */
			const loopRegex = /{% for (\w+) in (\w+) %}([\s\S]*?){% endfor %}/g;
			html = html.replace(loopRegex, function(match, item, list, template2) {
				/* Check if the list exists in the context */
				if (!context[list]) {
					return '';
				}

				/* Generate the content by iterating over the list */
				return context[list].map(element => {
					return template2.replace(new RegExp(`{{\\s*${item}\\s*}}`, 'g'), element);
				}).join('');
			});

			/* Update the HTML with the rendered content */
			return html;
		}
		var treateIf=(html)=>{
			/* Dealing with numbers */
			var ifRegex = /{% if (\S+) == (\S+) %}([\s\S]*?){% endif %}/g;
			html = html.replace(ifRegex,function(a,x,y,z){
				if (String(x)==String(y))
					return z
				else
					/* return a */
					return '';
			});
			var ifRegex = /{% if (\S+) != (\S+) %}([\s\S]*?){% endif %}/g;
			html = html.replace(ifRegex,function(a,x,y,z){
				if (String(x)!=String(y))
					return z
				else
					/* return a */
					return '';
			});
			/* Dealing with strings */
			var ifRegex = /{% if "([\S\s]*?)" == "([\S\s]*?)" %}([\s\S]*?){% endif %}/g;
			html = html.replace(ifRegex,function(a,x,y,z){
				if (String(x)==String(y))
					return z
				else
					/* return a */
					return '';
			});
			var ifRegex = /{% if "([\S\s]*?)" != "([\S\s]*?)" %}([\s\S]*?){% endif %}/g;
			html = html.replace(ifRegex,function(a,x,y,z){
				if (String(x)!=String(y))
					return z
				else
					/* return a */
					return '';
			});
			return html;
		}
		this.setItem=(key,value)=>{
			data[key]=value;
			updatePage();
		}
		this.getItem=(key)=>{
			return data[key];
		}
		this.setList=(key,value)=>{
			lists[key]=value;
			updatePage();
		}
		this.getList=(key)=>{
			return lists[key];
		}
		
	}
}
var page=new RelativeJS();