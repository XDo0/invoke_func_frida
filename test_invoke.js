// function test_invoke(){
//     // var soName=""
//     // 获取目标进程中 SO 库的基地址
//     console.log("test start!")
//     // var base=
//     Module.load('/data/app/libxnn.so')//.base
//     // 获取函数的地址
//     const funcAddr = Module.findExportByName("libxnn.so", "Java_xnn_XNNJNI_forward");
//     console.log("funcAddr: ",funcAddr)

//     // 使用 NativeFunction 创建一个 JS 中的函数对象
//     const myFunction = new NativeFunction(funcAddr, "int", ["int", ]);

//     // 调用 my_function 函数，并打印返回值
//     const returnValue = myFunction(1);
//     console.log("my_function return value:", returnValue);
// }
function invoke_func(addr,contents){
    var result = null;
    var func = new NativeFunction(addr,'int32',['pointer','pointer','int32']); // new一个native函数
    Java.perform(function(){    
        var env = Java.vm.getEnv();
        console.log("content is ",contents)
        // cast to jint
        // var jContent = env.newIntArray(contents)
        var jContent = contents
        console.log("jContent is ",jContent)        
        // var jstring =  env.newStringUtf(contents)
        // JNI函数才需要env和ptr(1)
        result = func(env,ptr(1),jContent)
        console.log("result is =>",result)
        // result = env.getStringUtfChars(result, null)
        // result = env.getIntField(result,null)
        // console.log("result = env.getIntArrayElements(result,null)")

    })
    return result;
}



// function invoke_method01(){
//     console.log("invoke_method01")
//     var base = Module.findBaseAddress('libxnn.so')
//     var method01_addr  = base.add(0x0005d29d)
//     var result  = invoke_func(method01_addr,1)
//     console.log("result is ",result)  
// }


function invoke_method01_1(){
    var base = Module.load('/data/app/libxnn.so').base
    var method01_addr = base.add(0x0005d29d)
    var result = invoke_func(method01_addr,0)
    console.log("result:",result)

    // 找到名为 xnn 的库
    var module = Process.findModuleByName("libxnn.so");
    if (module) {
        console.log("Found module at base address: " + module.base);
    } else {
        console.log("Module not found");
    }

}

console.log("start")
// invoke_method01()
invoke_method01_1()