# 攤牌 (Showdown)

以 TypeScript 撰寫的攤牌撲克遊戲，以控制台遊玩。

## 遊戲流程 (Gameplay)

遊戲由一位玩家與三位電腦玩家進行，流程如下：

> 1\. 玩家為自己以及各個電腦玩家命名。  
> 2\. 洗牌、發牌。  
> 3\. 每位玩家輪流進行回合，每個玩家可以依序進行以下兩個動作：首先，決定是否要與特定玩家交換手牌，然後以蓋牌方式打出一張牌。  
> 4\. 每回合由牌面最大的牌勝出，該玩家得一分。  
> 5\. 13 回合後結算分數，得分最高的玩家勝出。

交換手牌：

> 是本遊戲中的特殊行為，每位玩家只能使用一次，可以決定是否與特定玩家交換手牌。手牌互換會在該回合所有玩家結束回合後進行，並且在三回合後的相同時機將兩人的手牌換回。

牌面大小：

> 首先比較牌面大小：A > K > Q > J > ... > 2  
> 如果牌面相同則比較花色：&#x2660; > &#x2665; > &#x2666; > &#x2663;

## 遊玩方式 (How to Play)

首先安裝必要的套件：

``` bash
npm install
```

之後必須打包一次：

``` bash
npm run build
```

接著在控制台 (console) 中運行以下指令即可：

``` bash
npm run start
```

## 套件 (Packages)

CLI 相關套件可以參考：

* [Commander.js](https://github.com/tj/commander.js)
* [readline](https://github.com/maleck13/readline)
* [Inquirer.js](github.com/SBoudrias/Inquirer.js)
* [enquirer](https://github.com/enquirer/enquirer)
* [figlet](https://github.com/patorjk/figlet.js)
* [colorette](https://github.com/jorgebucaran/colorette)

> 實際使用到的請以 package.json 為準。
