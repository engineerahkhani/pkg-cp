export default class Number {
    constructor(number) {
        this.number = number;
    }
    addCommas() {
        this.number += '';
        x = this.number.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        this.number = x1 + x2;
        return this;
    }
    toPersian(dontTrim = true) {
        let i = 0,
            num = dontTrim ? this.number.toString() : this.number.toString().trim(),
            len = num.length,
            res = '',
            pos,
            persianNumbers = typeof persianNumber == 'undefined' ?
                ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
                persianNumbers;
        for (; i < len; i++)
            if (( pos = persianNumbers[num.charAt(i)] ))
                res += pos;
            else
                res += num.charAt(i);
        this.number = res;
        return this;
    }

      show = () => this.number
}

