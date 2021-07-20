window.$=window.jQuery=function(selectorOrArrayOrTemplate){
    let elements
    if(typeof selectorOrArrayOrTemplate==='string'){
        if(selectorOrArrayOrTemplate[0]==='<'){
            elements=[createElement(selectorOrArrayOrTemplate)]//创建元素
        }else{
            elements=document.querySelectorAll(selectorOrArrayOrTemplate)//获取元素
        }
    }else if(selectorOrArrayOrTemplate instanceof Array){
            elements=selectorOrArrayOrTemplate
    }
    function createElement(string){
        const container=document.createElement("template")
        container.innerHTML=string.trim()
        return container.content.firstChild
    }
    const api=Object.create(jQuery.prototype)
    Object.assign(api,{
        jquery: true,
        oldApi:selectorOrArrayOrTemplate.oldApi,
        elements:elements
        
    })
    return api
}
jQuery.fn=jQuery.prototype={
    constructor:jQuery,
    jquery: true,
    get(index){
    return elements[index]
    },
    appendTo(node) {
        if (node instanceof Element) {
          this.each(el => node.appendChild(el))
        } else if (node.jquery === true) {
          this.each(el => node.get(0).appendChild(el))
        }
    },
    append(children) {
        if (children instanceof Element) {
          this.get(0).appendChild(children);
        } else if (children instanceof HTMLCollection) {
          for (let i = 0; i < children.length; i++) {
            this.get(0).appendChild(children[i]);
          }
        } else if (children.jquery === true) {
          children.each(node => this.get(0).appendChild(node));
        }
      },
    addClass(className){
        for(let i=0;i<this.elements.length;i++){
           this.elements[i].classList.add(className)
        }
        return this
    },
    find(selector){
        let array=[]
        for(let i=0;i<this.elements.length;i++){
          const elements2= Array.from(this.elements[i].querySelectorAll(selector))
          array=array.concat(elements2)
        }
        array.oldApi=this //这个this是旧的api
        return jQuery(array)
    },
    parent(){
        let array=[]
        this.each(node=>{
        if(array.indexOf(node.parentNode)===-1){
            array.push(node.parentNode) 
        }    
    })
        return jQuery(array)
    },
    children(){
        let array=[]
        this.each(node=>{array.push(...node.children)}) // ...的意思是把node.children拆开第一个放第一个第二个放第二个
        return jQuery(array)
    },
    print(){
        console.log(this.elements)
    },
    end(){
       return this.oldApi   //这里是新的this
    },
    each(fn){
        for(let i=0;i<this.elements.length;i++){
            fn.call(null,this.elements[i],i)
        }
        return this
    }
}