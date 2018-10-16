export default destructMS= (milli) =>{
    if (isNaN(milli) || milli < 0) {
        return null;
    }
    var seconds = parseInt(milli, 10);
    var days = Math.floor(seconds / (3600*24));
    seconds  -= days*3600*24;
    var hrs   = Math.floor(seconds / 3600);
    seconds  -= hrs*3600;
    var mnts = Math.floor(seconds / 60);
    seconds  -= mnts*60;
    const hr = days*24 + hrs;
    return {
        d: ('00' + days).slice(-3) ,
        h:('00' + hr).slice(-3)  ,
        m: ('00' + mnts).slice(-3) ,
        s:('00' + seconds).slice(-3)
    };

}