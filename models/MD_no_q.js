
var nq = {
    a1: function (string_W_q, RP) {
        const regex = /`/gm;
        const str = string_W_q;
        const subst = RP;

        // The substituted value will be contained in the result variable
        const result = str.replace(regex, subst);

        console.log('Substitution result: ', result);
        return result;
    },
    a2: function (string_W_q, RP) {
        const regex = /'/gm;
        const str = string_W_q;
        const subst = RP;

        // The substituted value will be contained in the result variable
        const result = str.replace(regex, subst);

        console.log('Substitution result: ', result);

        return result;

    },
    a3: function (string_W_q, RP) {
        const regex = /"/gm;
        const str = string_W_q;
        const subst = RP;

        // The substituted value will be contained in the result variable
        const result = str.replace(regex, subst);

        console.log('Substitution result: ', result);
        return result;

    },
    doall: function (string_W_q, RP) {
        console.log("🚀 ~ file: MD_no_q.js ~ line 37 ~ name ~ string_W_q", string_W_q)
        this.f1 = nqT.a1(string_W_q, RP);
        console.log("🚀 ~ file: MD_no_q.js ~ line 39 ~ name ~ f1", this.f1)
        this.f2 = nqT.a2(this.f1 ? this.f1 : "n/a", RP);
        console.log("🚀 ~ file: MD_no_q.js ~ line 41 ~ name ~ f2", this.f2)
        this.f3 = nqT.a3(this.f2 ? this.f2 : "n/a", RP);
        console.log("🚀 ~ file: MD_no_q.js ~ line 43 ~ name ~ f3", this.f3)
        return this.f3 ? this.f3 : "n/a"
    }
}

var nqT = module.exports = nq;