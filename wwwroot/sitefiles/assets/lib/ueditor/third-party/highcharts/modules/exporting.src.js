!function(t){var e,n=t.Chart,o=t.addEvent,i=t.removeEvent,r=t.createElement,a=t.discardElement,s=t.css,l=t.merge,p=t.each,c=t.extend,h=Math.max,u=document,d=window,m=t.isTouchDevice,g="px",x=t.Renderer.prototype.symbols,y=t.getOptions();c(y.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"}),y.navigation={menuStyle:{border:"1px solid #A0A0A0",background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:m?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}},y.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}},t.post=function(t,e){var n,o;for(n in o=r("form",{method:"post",action:t,enctype:"multipart/form-data"},{display:"none"},u.body),e)r("input",{type:"hidden",name:n,value:e[n]},null,o);o.submit(),a(o)},c(n.prototype,{getSVG:function(e){var n,o,i,s,h,d,m,x,y=this,f=l(y.options,e);return u.createElementNS||(u.createElementNS=function(t,e){return u.createElement(e)}),o=r("div",null,{position:"absolute",top:"-9999em",width:y.chartWidth+g,height:y.chartHeight+g},u.body),m=y.renderTo.style.width,x=y.renderTo.style.height,h=f.exporting.sourceWidth||f.chart.width||/px$/.test(m)&&parseInt(m,10)||600,d=f.exporting.sourceHeight||f.chart.height||/px$/.test(x)&&parseInt(x,10)||400,c(f.chart,{animation:!1,renderTo:o,forExport:!0,width:h,height:d}),f.exporting.enabled=!1,f.series=[],p(y.series,function(t){(s=l(t.options,{animation:!1,showCheckbox:!1,visible:t.visible})).isInternal||f.series.push(s)}),n=new t.Chart(f,y.callback),p(["xAxis","yAxis"],function(t){p(y[t],function(e,o){var i=n[t][o],r=e.getExtremes(),a=r.userMin,s=r.userMax;!i||void 0===a&&void 0===s||i.setExtremes(a,s,!0,!1)})}),i=n.container.innerHTML,f=null,n.destroy(),a(o),i=(i=i.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/&nbsp;/g," ").replace(/&shy;/g,"­").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(t){return t.toLowerCase()})).replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},exportChart:function(e,n){e=e||{};var o=this.options.exporting,i=this.getSVG(l({chart:{borderRadius:0}},o.chartOptions,n,{exporting:{sourceWidth:e.sourceWidth||o.sourceWidth,sourceHeight:e.sourceHeight||o.sourceHeight}}));e=l(this.options.exporting,e),t.post(e.url,{filename:e.filename||"chart",type:e.type,width:e.width||0,scale:e.scale||2,svg:i})},print:function(){var t=this,e=t.container,n=[],o=e.parentNode,i=u.body,r=i.childNodes;t.isPrinting||(t.isPrinting=!0,p(r,function(t,e){1===t.nodeType&&(n[e]=t.style.display,t.style.display="none")}),i.appendChild(e),d.focus(),d.print(),setTimeout(function(){o.appendChild(e),p(r,function(t,e){1===t.nodeType&&(t.style.display=n[e])}),t.isPrinting=!1},1e3))},contextMenu:function(t,e,n,i,a,l,u){var d,m,x,y,f=this,b=f.options.navigation,v=b.menuItemStyle,w=f.chartWidth,S=f.chartHeight,k="cache-"+t,E=f[k],C=h(a,l);E||(f[k]=E=r("div",{className:t},{position:"absolute",zIndex:1e3,padding:C+g},f.container),d=r("div",null,c({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},b.menuStyle),E),m=function(){s(E,{display:"none"}),u&&u.setState(0),f.openMenu=!1},o(E,"mouseleave",function(){x=setTimeout(m,500)}),o(E,"mouseenter",function(){clearTimeout(x)}),o(document,"mousedown",function(e){f.pointer.inClass(e.target,t)||m()}),p(e,function(t){if(t){var e=t.separator?r("hr",null,null,d):r("div",{onmouseover:function(){s(this,b.menuItemHoverStyle)},onmouseout:function(){s(this,v)},onclick:function(){m(),t.onclick.apply(f,arguments)},innerHTML:t.text||f.options.lang[t.textKey]},c({cursor:"pointer"},v),d);f.exportDivElements.push(e)}}),f.exportDivElements.push(d,E),f.exportMenuWidth=E.offsetWidth,f.exportMenuHeight=E.offsetHeight),y={display:"block"},n+f.exportMenuWidth>w?y.right=w-n-a-C+g:y.left=n-C+g,i+l+f.exportMenuHeight>S&&"top"!==u.alignOptions.verticalAlign?y.bottom=S-i-C+g:y.top=i+l-C+g,s(E,y),f.openMenu=!0},addButton:function(n){var o,i,r=this,a=r.renderer,s=l(r.options.navigation.buttonOptions,n),p=s.onclick,h=s.menuItems,u={stroke:s.symbolStroke,fill:s.symbolFill},d=s.symbolSize||12;if(r.btnCount||(r.btnCount=0),r.exportDivElements||(r.exportDivElements=[],r.exportSVGElements=[]),!1!==s.enabled){var m,g=s.theme,x=g.states,y=x&&x.hover,f=x&&x.select;delete g.states,p?m=function(){p.apply(r,arguments)}:h&&(m=function(){r.contextMenu(i.menuClassName,h,i.translateX,i.translateY,i.width,i.height,i),i.setState(2)}),s.text&&s.symbol?g.paddingLeft=t.pick(g.paddingLeft,25):s.text||c(g,{width:s.width,height:s.height,padding:0}),(i=a.button(s.text,0,0,m,g,y,f).attr({title:r.options.lang[s._titleKey],"stroke-linecap":"round"})).menuClassName=n.menuClassName||"highcharts-menu-"+r.btnCount++,s.symbol&&(o=a.symbol(s.symbol,s.symbolX-d/2,s.symbolY-d/2,d,d).attr(c(u,{"stroke-width":s.symbolStrokeWidth||1,zIndex:1})).add(i)),i.add().align(c(s,{width:i.width,x:t.pick(s.x,e)}),!0,"spacingBox"),e+=(i.width+s.buttonSpacing)*("right"===s.align?-1:1),r.exportSVGElements.push(i,o)}},destroyExport:function(t){var e,n,o=t.target;for(e=0;e<o.exportSVGElements.length;e++)(n=o.exportSVGElements[e])&&(n.onclick=n.ontouchstart=null,o.exportSVGElements[e]=n.destroy());for(e=0;e<o.exportDivElements.length;e++)n=o.exportDivElements[e],i(n,"mouseleave"),o.exportDivElements[e]=n.onmouseout=n.onmouseover=n.ontouchstart=n.onclick=null,a(n)}}),x.menu=function(t,e,n,o){return["M",t,e+2.5,"L",t+n,e+2.5,"M",t,e+o/2+.5,"L",t+n,e+o/2+.5,"M",t,e+o-1.5,"L",t+n,e+o-1.5]},n.prototype.callbacks.push(function(t){var n,i=t.options.exporting,r=i.buttons;if(e=0,!1!==i.enabled){for(n in r)t.addButton(r[n]);o(t,"destroy",t.destroyExport)}})}(Highcharts);