function MONEY_document_ready() {
    $(document).ready(function () {

        console.log("ready!");
        var BF2 = document.createElement('div');
        BF2.classList.add('QFF');
        BF2.innerText = `[]`;
        document.body.appendChild(BF2);
        var step_through_the_iron_shoes_and_find_nowhere = document.getElementsByClassName('step_through_the_iron_shoes_and_find_nowhere');
        for (let index_sttisafn = 14; index_sttisafn < step_through_the_iron_shoes_and_find_nowhere.length; index_sttisafn++) {
            const element_sttisafn = step_through_the_iron_shoes_and_find_nowhere[index_sttisafn];
            console.log("🎍🎍🎍🎍🎍🎍🎍🎍🎍🎍🎍", element_sttisafn);
            element_sttisafn.addEventListener("DOMCharacterDataModified", function (event) {
                console.log("🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠🎠");
                var step_through_the_iron_shoes_and_find_nowhere_ = document.getElementsByClassName('step_through_the_iron_shoes_and_find_nowhere');
                var ary12 = [];
                for (let index_sttisafn_ = 2; index_sttisafn_ < 14; index_sttisafn_++) {
                    const element_sttisafn_ = step_through_the_iron_shoes_and_find_nowhere_[index_sttisafn_];
                    ary12.push(deltaE(JSON.parse(element_sttisafn.innerText), JSON.parse(element_sttisafn_.innerText)));
                }
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                var tmp987 = JSON.parse(document.getElementsByClassName('QFF')[0].innerText);
                tmp987.push(
                    {
                        idx: index_sttisafn - 14,
                        clonum: findIndexOfMinMax(ary12).minIndex
                    }
                );
                document.getElementsByClassName('QFF')[0].innerText = JSON.stringify(
                    tmp987
                );
            }, false);
        }
    });
}

function findIndexOfMinMax(arr) {
    let minIndex = 0;
    let maxIndex = 1;
    let min = arr[0];
    let max = arr[1];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            minIndex = i;
        }
        if (arr[i] > max) {
            max = arr[i]
            maxIndex = i;
        }
    }
    return {
        minIndex,
        maxIndex
    };
}

function deferJQ(method) {
    if (window.jQuery) {
        method();
    } else {
        setTimeout(function () { deferJQ(method) }, 50);
    }
}


deferJQ(function () {
    console.log("jQuery is now loaded");
MONEY_document_ready();
});
