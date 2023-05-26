function invoke_func(addr){
    var result = null;
    var func = new NativeFunction(addr,'int32',['pointer','pointer']); // new一个native函数
    Java.perform(function(){    
        var env = Java.vm.getEnv();        
        result = func(env,ptr(1))
        console.log("result is =>",result)
        // result = env.getStringUtfChars(result, null)
        // result = env.getIntField(result,null)
        // console.log("result = env.getIntArrayElements(result,null)")

    })
    return result;
}




function invoke_method01_1(){
    Module.load('/data/app/libc++_shared.so')
    Module.load('/data/app/libyuv.so')
    Module.load('/data/app/libjpeg-turbo.so')
    var base = Module.load('/data/app/libalphaface.so').base
    // int __fastcall IESNN::Net::CreateNet(int, int, int)
    var method01_addr = base.add(0x000063dd)
    var result = invoke_func(method01_addr,0,2,6)
    console.log("result:",result)

    // 找到名为 xnn 的库
    var module = Process.findModuleByName("libbytenn.so");
    if (module) {
        console.log("Found module at base address: " + module.base);
    } else {
        console.log("Module not found");
    }

}

console.log("start")
// invoke_method01()
invoke_method01_1()