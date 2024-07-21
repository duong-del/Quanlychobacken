export async function testlog(req,res,next) {
    console.log('Test log middleware', req );
    next();
}