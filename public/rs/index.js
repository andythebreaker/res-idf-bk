function edit1() {
    $.post("/main/e1", {
        no: '55',
        name: 'd4444fb',
        subcategory: 'df444b',
        url: 'http://localhost:5000/main/AddElectronicResources',
        submit: '送出'
    }, (res) => {
        if (res.includes('資料寫入成功!')) {
            console.log('OK')
document.getElementById('').click();
        } else {
            console.log('X');
            Swal.fire(
                '錯誤',
                '資料寫入錯誤,保持原始狀態',
                'error'
              );
        }
    });
}