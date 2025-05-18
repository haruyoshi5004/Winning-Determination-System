// 当たりの20個の数字をランダムに設定
const totalNumbers = 200;
const numberOfWinners = 20;
const winners = new Set();

// 重複しないようにランダムな当たり番号を生成
while (winners.size < numberOfWinners) {
    // const randomNum = Math.floor(Math.random() * totalNumbers) + 1;
    // winners.add(randomNum);
    
    winners.add(12);
    winners.add(20);
    winners.add(40);
    winners.add(55);
    winners.add(67);
    winners.add(70);
    winners.add(71);
    winners.add(78);
    winners.add(80);
    winners.add(91);
    winners.add(94);
    winners.add(116);
    winners.add(152);
    winners.add(158);
    winners.add(165);
    winners.add(173);
    winners.add(175);
    winners.add(184);
    winners.add(187);
    winners.add(197);
}

// 当たり番号の初期状態を可視化する関数
function displayWinners() {
    const winnerListDiv = document.getElementById('winnerList');
    if (!winnerListDiv) return;  // winnerListが存在しない場合、関数をスキップ

    winnerListDiv.innerHTML = ''; // リストを初期化

    // 1から200までの番号を全て表示し、当たり番号は特別なクラスを付与
    for (let i = 1; i <= totalNumbers; i++) {
        const span = document.createElement('span');
        span.textContent = i;
        if (winners.has(i)) {
            span.classList.add('hit');
        }
        winnerListDiv.appendChild(span);
    }
}

displayWinners(); // ページ読み込み時に当たり番号を表示

document.getElementById('submitButton').addEventListener('click', function() {
    const inputNumber = parseInt(document.getElementById('inputNumber').value);
    const resultMessage = document.getElementById('resultMessage');
    const winSound = document.getElementById('winSound');
    const container = document.querySelector('.container');

    // 入力が1から200の範囲外の場合
    if (isNaN(inputNumber) || inputNumber < 1 || inputNumber > 200) {
        resultMessage.textContent = "1から200までの数値を入力してください！";
        resultMessage.style.color = "orange";
        resultMessage.style.fontSize = "24px";

        setTimeout(() => {
            resultMessage.style.fontSize = "18px";
            resultMessage.style.color = "orange";
        }, 3000); // 3秒後にメッセージをリセット
        return; // 処理を中断
    }


    if (winners.has(inputNumber)) {
        // "ぶんこちゃんファイル"の場合は画面全体に派手に表示
        const fullscreenDiv = document.createElement('div');
        fullscreenDiv.id = 'fullscreenMessage';
        fullscreenDiv.innerHTML = "<h1>ぶんこちゃんファイルです！<br>おめでとうございます！</h1>";
        document.body.appendChild(fullscreenDiv);

        // 花火の演出を開始
        const fireworksContainer = document.createElement('div');
        fireworksContainer.id = 'fireworksContainer';
        document.body.appendChild(fireworksContainer);

        const fireworks = new Fireworks(fireworksContainer, {
            speed: 2,
            particles: 100,
            traceLength: 3,
            explosion: 6,
            autoresize: true
        });
        fireworks.start();


        // 音を再生
        winSound.play();

        // 7秒後にフルスクリーンのメッセージを消す
        setTimeout(() => {
            document.body.removeChild(fullscreenDiv);
            fireworks.stop();  // 花火を停止
            document.body.removeChild(fireworksContainer);  // 花火の要素を削除
        }, 7000);
        resultMessage.textContent = "ぶんこちゃんファイルです！おめでとうございます！";
        resultMessage.style.color = "red";
    } else {
        // "チロルチョコ"の場合は少し派手に表示
        resultMessage.textContent = "チロルチョコです！おめでとうございます！";
        resultMessage.classList.add('cuteFont'); // ここでクラスを追加
        resultMessage.style.color = "red";
        resultMessage.style.fontSize = "50px";
        container.style.backgroundColor = "#f48fb1";
        container.style.boxShadow = "0 0 20px rgba(255, 105, 135, 0.5)";

        
        // 画面全体を点滅させる
        document.body.classList.add('flash-screen');

        // 5秒後に点滅を止め、元の状態に戻す
        setTimeout(() => {
            document.body.classList.remove('flash-screen');
            resultMessage.classList.remove('cuteFont'); // クラスを元に戻す
            resultMessage.style.fontSize = "18px";
            container.style.backgroundColor = "#fff";
            container.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.1)";
            document.body.removeChild(starsDiv); // 星の背景を削除
        }, 5000);


    }

    // 入力後に当たり番号リストを更新
    displayWinners();
});
