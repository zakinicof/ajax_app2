function check() {
  // postをクラス名にもつ要素を取得
  // 表示されている全てのメモを取得
  const posts = document.querySelectorAll(".post");
  // それぞれのpost要素への処理を記述
  posts.forEach(function (post) {
    // addEventListenerが重複して追加されることを回避
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // postをクリックした時に発動
    post.addEventListener("click", () => {
      // メモのidを取得
      const postId = post.getAttribute("data-id");
      // HTTPリクエストを行うためにオブジェクトを生成
      const XHR = new XMLHttpRequest();
      // リクエストの詳細を指定（HTTPメソッドはGET、下記のパスで、非同期通信）
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスの形式はJSONに指定
      XHR.responseType = "json";
      // この記述ではじめてリクエストを行える
      XHR.send();
      // ここより上がリクエスト、ここより下がレスポンス
      // レスポンスの受信に成功したら呼び出される
      XHR.onload = () => {
        // もし処理が成功しなかったら
        if (XHR.status != 200) {
          // アラートを表示して
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // この先の処理を行わないようにする
          return null;          
        }
        // レスポンスされてきたJSONにアクセスし、checkedアクションのitemを取得
        const item = XHR.response.post;
        // 既読であれば
        if (item.checked === true) {
          // 属性値にtrueをセット（グレーアウト）
          post.setAttribute("data-check", "true");
          // 未読であれば
        } else if (item.checked === false) {
          // 属性ごと削除する
          post.removeAttribute("data-check");
        }
      };
    });
   });
}
// ページを読み込んだ時にcheck関数を実行から、check関数が1秒に1度実行されるように変更
// window.addEventListener("load", check);
setInterval(check, 1000);