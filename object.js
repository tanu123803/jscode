function fun(){
    console.log(this)
}
setTimeout(() => {
    fun()
    
}, timeout);
