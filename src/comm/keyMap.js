
export const keyMap = (keyData) => {
    var e = "rRseEfaqQtTdwWczxvgASDFGZXCVkoiOjpuPhynbmlYUIHJKLBNM"; //39
    var k = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅁㄴㅇㄹㅎㅋㅌㅊㅍㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣㅛㅕㅑㅗㅓㅏㅣㅠㅜㅡ";     //39
    var a = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";                          // 19
    var b = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";                       // 21
    var c = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";              // 27
    var 첫모음 = 28;
    var 가 = 44032;
    var 힣 = 55203;
    var ㄱ = 12593;
    var ㅣ = 12643;
    
    var request ='';
    var max = keyData.length;
    for(var i = 0 ; i<max;i++){
        request+= k[e.indexOf(keyData[i])]
    }
    
    return request;
}