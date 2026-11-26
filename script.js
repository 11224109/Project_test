
    const canvas = document.getElementById('boardCanvas');
    const ctx = canvas.getContext('2d');
    const homeScreen = document.getElementById('homeScreen');
    const setupScreen = document.getElementById('setupScreen');
    const appContainer = document.querySelector('.app-container');
    const backHomeBtn = document.getElementById('backHomeBtn');
    const setupBackHomeBtn = document.getElementById('setupBackHomeBtn');
    const setupModeBadge = document.getElementById('setupModeBadge');
    const onlineSetupNote = document.getElementById('onlineSetupNote');
    const joinRoomSetup = document.getElementById('joinRoomSetup');
    const setupGameOptions = document.getElementById('setupGameOptions');
    const startGameBtn = document.getElementById('startGameBtn');
    const joinRoomBtn = document.getElementById('joinRoomBtn');
    const roomCodeInput = document.getElementById('roomCodeInput');
    const joinRoomError = document.getElementById('joinRoomError');

    const gameBtns = document.querySelectorAll('.game-btn');
    const gomokuOptions = document.getElementById('gomokuOptions');
    const aiSettingsBox = document.getElementById('aiSettingsBox');
    const onlineSettingsBox = document.getElementById('onlineSettingsBox');

    const boardSizeSelect = document.getElementById('boardSizeSelect');
    const gridSizeOptions = document.getElementById('gridSizeOptions');
    const gridSizeSelect = document.getElementById('gridSizeSelect');
    const gridSizeLabel = document.getElementById('gridSizeLabel');
    const targetLinesSelect = document.getElementById('targetLinesSelect');
    const aiDifficultySelect = document.getElementById('aiDifficulty');
    const playerColorSelect = document.getElementById('playerColorSelect');
    const ruleBadge = document.getElementById('ruleBadge');

    const myRoomIdEl = document.getElementById('myRoomId');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const roomOwnerInfo = document.getElementById('roomOwnerInfo');
    const networkStatus = document.getElementById('networkStatus');

    const turnStoneIcon = document.getElementById('turnStoneIcon');
    const turnText = document.getElementById('turnText');
    const p1ScoreIcon = document.getElementById('p1ScoreIcon');
    const p2ScoreIcon = document.getElementById('p2ScoreIcon');
    const p1Label = document.getElementById('p1Label');
    const p2Label = document.getElementById('p2Label');
    const p1ScoreText = document.getElementById('p1ScoreText');
    const p2ScoreText = document.getElementById('p2ScoreText');
    const toastBanner = document.getElementById('toastBanner');

    const winToast = document.getElementById('winToast');
    const winTitle = document.getElementById('winTitle');
    const winSubtitle = document.getElementById('winSubtitle');
    const rulePanelTitle = document.getElementById('rulePanelTitle');
    const rulePanelContent = document.getElementById('rulePanelContent');

    // 四款棋類的右側規則說明內容
    const GAME_RULES_HTML = {
      gomoku: `
        <div class="rule-item">
          <h3>🎯 勝利目標</h3>
          <p>在橫、直或斜向將 <strong>5 顆同色棋子</strong>連成一線即算 1 條線；率先累積達到設定的「目標連線數（1～5 條）」即獲得最終勝利。</p>
        </div>
        <div class="rule-item">
          <h3>🕹️ 操作與規則</h3>
          <ul>
            <li>黑子先手、白子後手，輪流點擊交叉點落子。</li>
            <li>達成一條五連珠時會亮起色線並計分，對局會繼續進行直到某一方湊齊指定條數。</li>
            <li>同一方向超過 5 顆不會重複計分，需另闢新線。</li>
          </ul>
        </div>
      `,
      tictactoe: `
        <div class="rule-item">
          <h3>🎯 勝利目標</h3>
          <p>在棋盤上率先將自己的符號（<strong>X</strong> 或 <strong>O</strong>）在橫、直或對角線連成與棋盤邊長相同數量即獲勝；格數越大，勝利所需連線越長。</p>
        </div>
        <div class="rule-item">
          <h3>🕹️ 操作與技巧</h3>
          <ul>
            <li>叉叉 (X) 先手，點擊任意空格即可放置。</li>
            <li>搶佔正中央格與四個角落可創造最多雙向連線機會。</li>
            <li>若棋盤全滿仍無人連線則判定平局。</li>
          </ul>
        </div>
      `,
      othello: `
        <div class="rule-item">
          <h3>🎯 勝利目標</h3>
          <p>在偶數格數棋盤上落子夾擊對手，當棋盤下滿或雙方皆無步可走時，場上<strong>棋子數量較多</strong>的一方獲勝。</p>
        </div>
        <div class="rule-item">
          <h3>🕹️ 夾擊翻轉規則</h3>
          <ul>
            <li>落子位置必須與自己已有的另一顆棋子，在橫、直或斜線上<strong>夾住對方的連續棋子</strong>（畫面上會以小白點提示可落子處）。</li>
            <li>被夾住的對手棋子會全部翻轉成你的顏色。</li>
            <li>若某一方完全沒有合法落子點，必須跳過回合由對手繼續下。</li>
          </ul>
        </div>
      `,
      watermelon: `
        <div class="rule-item">
          <h3>🎯 勝利目標</h3>
          <p>台灣經典童玩！雙方各有 <strong>6 顆棋子</strong>（紅瓜子 vs 綠瓜子），將對手的棋子包圍吃掉，使對手剩餘棋子<strong>少於 3 顆</strong>（或無路可走）即獲勝！</p>
        </div>
        <div class="rule-item">
          <h3>🕹️ 移動與圍吃規則</h3>
          <ul>
            <li><strong>選子移動：</strong>先點擊自己的棋子（亮起金圈），再點擊綠色提示的相鄰空節點，每次沿線移動 1 步。</li>
            <li><strong>包圍吃子：</strong>移動後若將對手的單顆或多顆相連棋子周圍的所有相連空位（氣）全部堵死，被圍住的棋子就會立刻被吃掉！</li>
            <li>注意：不可主動走入自己會立刻沒氣的自殺位置（除非該步能同時吃掉對手）。</li>
          </ul>
        </div>
      `
    };

    // ================= 西瓜棋 21 節點拓撲圖定義 (歸一化座標 0~1) =================
    // 0: 中心天元
    // 1..4: 內圈十字 (上, 右, 下, 左)
    // 5..8: 中圈四角 (右上, 右下, 左下, 左上)
    // 9..12: 外圈四極 (正上, 正右, 正下, 正左)
    // 13..20: 四個半圓瓜瓣弧線中點 (每瓣各2點)
    const WM_NODES = [
      { x: 0.50, y: 0.50 }, // 0: 中心
      { x: 0.50, y: 0.34 }, // 1: 內上
      { x: 0.66, y: 0.50 }, // 2: 內右
      { x: 0.50, y: 0.66 }, // 3: 內下
      { x: 0.34, y: 0.50 }, // 4: 內左
      { x: 0.63, y: 0.37 }, // 5: 內右上
      { x: 0.63, y: 0.63 }, // 6: 內右下
      { x: 0.37, y: 0.63 }, // 7: 內左下
      { x: 0.37, y: 0.37 }, // 8: 內左上
      { x: 0.50, y: 0.12 }, // 9: 外正上
      { x: 0.88, y: 0.50 }, // 10: 外正右
      { x: 0.50, y: 0.88 }, // 11: 外正下
      { x: 0.12, y: 0.50 }, // 12: 外正左
      { x: 0.36, y: 0.16 }, // 13: 上瓜瓣左
      { x: 0.64, y: 0.16 }, // 14: 上瓜瓣右
      { x: 0.84, y: 0.36 }, // 15: 右瓜瓣上
      { x: 0.84, y: 0.64 }, // 16: 右瓜瓣下
      { x: 0.64, y: 0.84 }, // 17: 下瓜瓣右
      { x: 0.36, y: 0.84 }, // 18: 下瓜瓣左
      { x: 0.16, y: 0.64 }, // 19: 左瓜瓣下
      { x: 0.16, y: 0.36 }  // 20: 左瓜瓣上
    ];

    const WM_EDGES = [
      // 十字主幹
      [0,1],[0,2],[0,3],[0,4],
      // 內圈八邊圓環
      [1,5],[5,2],[2,6],[6,3],[3,7],[7,4],[4,8],[8,1],
      // 上瓜瓣弧線與頂點連接
      [1,9],[9,13],[9,14],[8,13],[5,14],[13,20],[14,15],
      // 右瓜瓣弧線
      [2,10],[10,15],[10,16],[5,15],[6,16],[16,17],
      // 下瓜瓣弧線
      [3,11],[11,17],[11,18],[6,17],[7,18],[18,19],
      // 左瓜瓣弧線
      [4,12],[12,19],[12,20],[7,19],[8,20]
    ];

    // 建立西瓜棋鄰接表
    const WM_ADJ = Array.from({ length: WM_NODES.length }, () => []);
    WM_EDGES.forEach(([a, b]) => {
      if (!WM_ADJ[a].includes(b)) WM_ADJ[a].push(b);
      if (!WM_ADJ[b].includes(a)) WM_ADJ[b].push(a);
    });

    // 遊戲全域狀態
    let currentGame = 'gomoku';
    let gameMode = 'ai';
    let setupMode = 'ai';
    let rows = 15, cols = 15;
    let targetLines = 1;
    let board = [];
    let wmPieces = []; // 西瓜棋 21 節點狀態 (0:空, 1:紅瓜子, 2:綠瓜子)
    let wmSelectedNode = null; // 西瓜棋目前選取的棋子節點索引
    let history = [];
    let currentTurn = 1;
    let myColor = 1;
    let gameOver = false;
    let hoverCell = null;
    let hoverNode = null;
    let completedLines = [];
    let winLineCoords = [];
    let toastTimer = null;

    let peer = null, conn = null, isRoomHost = false;
    const GRID_SIZES = {
      tictactoe: [3, 5, 7],
      othello: [6, 8, 10, 12]
    };
    const selectedGridSizes = { tictactoe: 3, othello: 8 };

    const GAME_META = {
      gomoku:     { title: '五子棋', p1: '黑子', p2: '白子', c1: '#0f172a', c2: '#f8fafc' },
      tictactoe:  { title: '井字棋', p1: '叉叉 (X)', p2: '圈圈 (O)', c1: '#38bdf8', c2: '#f43f5e' },
      othello:    { title: '黑白棋', p1: '黑棋', p2: '白棋', c1: '#0f172a', c2: '#f8fafc' },
      watermelon: { title: '西瓜棋', p1: '紅瓜子', p2: '綠瓜子', c1: '#ef4444', c2: '#22c55e' }
    };

    function showToast(msg) {
      clearTimeout(toastTimer);
      toastBanner.textContent = msg;
      toastBanner.classList.add('show');
      toastTimer = setTimeout(() => toastBanner.classList.remove('show'), 1900);
    }

    function initGame() {
      gomokuOptions.classList.toggle('hidden', currentGame !== 'gomoku');
      const availableGridSizes = GRID_SIZES[currentGame];
      gridSizeOptions.classList.toggle('hidden', !availableGridSizes);
      if (availableGridSizes) {
        gridSizeLabel.textContent = currentGame === 'othello' ? '棋盤格數（偶數）' : '棋盤格數（連線數同步）';
        gridSizeSelect.innerHTML = availableGridSizes
          .map(size => `<option value="${size}">${size} × ${size}</option>`)
          .join('');
        gridSizeSelect.value = String(selectedGridSizes[currentGame]);
      }
      const meta = GAME_META[currentGame];

      // 更新右側規則說明面板
      rulePanelTitle.textContent = `${meta.title} · 遊戲規則`;
      rulePanelContent.innerHTML = GAME_RULES_HTML[currentGame];

      if (currentGame === 'gomoku') {
        rows = cols = Number(boardSizeSelect.value);
        targetLines = Number(targetLinesSelect.value);
        ruleBadge.textContent = `${rows}×${cols} · 連 ${targetLines} 條勝`;
      } else if (currentGame === 'tictactoe') {
        rows = cols = selectedGridSizes.tictactoe;
        ruleBadge.textContent = `${rows}×${cols} · 連 ${rows} 子勝`;
      } else if (currentGame === 'othello') {
        rows = cols = selectedGridSizes.othello;
        ruleBadge.textContent = `${rows}×${cols} · 夾擊翻轉`;
      } else if (currentGame === 'watermelon') {
        ruleBadge.textContent = '21節點 · 圍吃對弈';
      }

      board = Array.from({ length: rows }, () => Array(cols).fill(0));
      history = [];
      completedLines = [];
      winLineCoords = [];
      wmSelectedNode = null;
      currentTurn = 1;
      gameOver = false;
      winToast.classList.remove('show');

      if (currentGame === 'othello') {
        const middle = rows / 2;
        board[middle - 1][middle - 1] = 2; board[middle - 1][middle] = 1;
        board[middle][middle - 1] = 1; board[middle][middle] = 2;
      } else if (currentGame === 'watermelon') {
        // 初始擺子：上方 6 顆紅瓜子(1)，下方 6 顆綠瓜子(2)
        wmPieces = Array(WM_NODES.length).fill(0);
        [9, 13, 14, 1, 8, 5].forEach(idx => wmPieces[idx] = 1);
        [11, 17, 18, 3, 6, 7].forEach(idx => wmPieces[idx] = 2);
      }

      p1ScoreIcon.style.background = meta.c1;
      p2ScoreIcon.style.background = meta.c2;
      p1Label.textContent = `${meta.p1}：`;
      p2Label.textContent = `${meta.p2}：`;

      if (gameMode === 'ai') {
        myColor = Number(playerColorSelect.value);
      }

      updateHUD();
      draw();

      if (gameMode === 'ai' && myColor === 2) {
        setTimeout(makeAIMove, 400);
      }
    }

    function updateHUD() {
      const meta = GAME_META[currentGame];
      turnStoneIcon.style.background = currentTurn === 1 ? meta.c1 : meta.c2;
      const pName = currentTurn === 1 ? meta.p1 : meta.p2;

      if (gameMode === 'ai') {
        turnText.textContent = `輪到：${pName} (${currentTurn === myColor ? '你' : 'AI'})`;
      } else {
        turnText.textContent = (!conn || !conn.open)
          ? '等待對手連線...'
          : `輪到：${pName} (${currentTurn === myColor ? '你的回合' : '對手思考中'})`;
      }

      if (currentGame === 'gomoku') {
        p1ScoreText.textContent = `${completedLines.filter(l => l.color === 1).length} / ${targetLines}`;
        p2ScoreText.textContent = `${completedLines.filter(l => l.color === 2).length} / ${targetLines}`;
      } else if (currentGame === 'othello') {
        let c1 = 0, c2 = 0;
        board.forEach(r => r.forEach(v => { if (v === 1) c1++; if (v === 2) c2++; }));
        p1ScoreText.textContent = `${c1} 子`;
        p2ScoreText.textContent = `${c2} 子`;
      } else if (currentGame === 'watermelon') {
        const c1 = wmPieces.filter(v => v === 1).length;
        const c2 = wmPieces.filter(v => v === 2).length;
        p1ScoreText.textContent = `剩 ${c1} 顆`;
        p2ScoreText.textContent = `剩 ${c2} 顆`;
      } else {
        p1ScoreText.textContent = `${rows}連線`;
        p2ScoreText.textContent = `${rows}連線`;
      }
    }

    // ================= 繪圖引擎 =================
    function draw() {
      const W = canvas.width;
      ctx.clearRect(0, 0, W, W);

      if (currentGame === 'gomoku') drawGomoku(W);
      else if (currentGame === 'tictactoe') drawTicTacToe(W);
      else if (currentGame === 'othello') drawOthello(W);
      else if (currentGame === 'watermelon') drawWatermelon(W);
    }

    function drawWatermelon(W) {
      // 淺木色西瓜棋盤底色
      const grad = ctx.createRadialGradient(W/2, W/2, 40, W/2, W/2, W*0.6);
      grad.addColorStop(0, '#fef3c7');
      grad.addColorStop(1, '#d97706');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, W);

      // 繪製外大圓與內小圓裝飾外框
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(W * 0.5, W * 0.5, W * 0.38, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(W * 0.5, W * 0.5, W * 0.16, 0, Math.PI * 2);
      ctx.stroke();

      // 繪製所有 21 節點連線軌道
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 3.2;
      WM_EDGES.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(WM_NODES[a].x * W, WM_NODES[a].y * W);
        ctx.lineTo(WM_NODES[b].x * W, WM_NODES[b].y * W);
        ctx.stroke();
      });

      // 計算目前選取棋子的合法移動目標點
      const validTargets = (wmSelectedNode !== null && !gameOver && canLocalPlay())
        ? getWatermelonValidMoves(wmSelectedNode, currentTurn)
        : [];

      // 繪製 21 個交叉節點
      WM_NODES.forEach((pt, idx) => {
        const cx = pt.x * W, cy = pt.y * W;
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();

        // 若為可移動的空位，畫出綠色呼吸光圈提示
        if (validTargets.includes(idx)) {
          ctx.save();
          ctx.fillStyle = 'rgba(34, 197, 94, 0.35)';
          ctx.strokeStyle = '#16a34a';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cx, cy, 18, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      });

      // 繪製紅、綠雙方瓜子棋子
      wmPieces.forEach((owner, idx) => {
        if (owner === 0) return;
        const cx = WM_NODES[idx].x * W, cy = WM_NODES[idx].y * W;
        const rad = 20;

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 3;

        const pGrad = ctx.createRadialGradient(cx - 6, cy - 6, 3, cx, cy, rad);
        if (owner === 1) {
          pGrad.addColorStop(0, '#fca5a5');
          pGrad.addColorStop(0.4, '#ef4444');
          pGrad.addColorStop(1, '#991b1b');
        } else {
          pGrad.addColorStop(0, '#86efac');
          pGrad.addColorStop(0.4, '#22c55e');
          pGrad.addColorStop(1, '#166534');
        }
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();

        // 選取高亮外框
        if (wmSelectedNode === idx) {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(cx, cy, rad + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      });
    }

    function drawGomoku(W) {
      const pad = W * 0.065;
      const cell = (W - pad * 2) / (rows - 1);
      ctx.fillStyle = '#deb887';
      ctx.fillRect(0, 0, W, W);

      ctx.strokeStyle = '#4a3219';
      ctx.lineWidth = rows > 15 ? 1.3 : 1.8;
      for (let i = 0; i < rows; i++) {
        const p = pad + i * cell;
        ctx.beginPath(); ctx.moveTo(pad, p); ctx.lineTo(W - pad, p); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(p, pad); ctx.lineTo(p, W - pad); ctx.stroke();
      }

      if (!gameOver && hoverCell && board[hoverCell.r][hoverCell.c] === 0 && canLocalPlay()) {
        ctx.save(); ctx.globalAlpha = 0.4;
        ctx.fillStyle = myColor === 1 ? '#0f172a' : '#fff';
        ctx.beginPath();
        ctx.arc(pad + hoverCell.c * cell, pad + hoverCell.r * cell, cell * 0.42, 0, Math.PI * 2);
        ctx.fill(); ctx.restore();
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (!board[r][c]) continue;
          const cx = pad + c * cell, cy = pad + r * cell, rad = cell * 0.43;
          ctx.fillStyle = board[r][c] === 1 ? '#0f172a' : '#f8fafc';
          ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.stroke();
        }
      }

      completedLines.forEach(line => {
        ctx.save();
        ctx.strokeStyle = line.color === 1 ? '#f43f5e' : '#0284c7';
        ctx.lineWidth = 4.5; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(pad + line.start.c * cell, pad + line.start.r * cell);
        ctx.lineTo(pad + line.end.c * cell, pad + line.end.r * cell);
        ctx.stroke(); ctx.restore();
      });
    }

    function drawTicTacToe(W) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, W, W);
      const cell = W / cols;

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = Math.max(2, W / 100);
      for (let i = 1; i < rows; i++) {
        ctx.beginPath(); ctx.moveTo(cell * i, 30); ctx.lineTo(cell * i, W - 30); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(30, cell * i); ctx.lineTo(W - 30, cell * i); ctx.stroke();
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const val = board[r][c];
          const cx = c * cell + cell / 2, cy = r * cell + cell / 2, rad = cell * 0.29;
          if (val === 1) {
            ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = Math.max(3, cell * 0.1); ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(cx - rad, cy - rad); ctx.lineTo(cx + rad, cy + rad);
            ctx.moveTo(cx + rad, cy - rad); ctx.lineTo(cx - rad, cy + rad);
            ctx.stroke();
          } else if (val === 2) {
            ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = Math.max(3, cell * 0.1);
            ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke();
          }
        }
      }

      if (winLineCoords.length >= rows) {
        const s = winLineCoords[0], e = winLineCoords[winLineCoords.length - 1];
        ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = Math.max(4, cell * 0.08); ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(s.c * cell + cell / 2, s.r * cell + cell / 2);
        ctx.lineTo(e.c * cell + cell / 2, e.r * cell + cell / 2);
        ctx.stroke();
      }
    }

    function drawOthello(W) {
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, 0, W, W);
      const cell = W / cols;

      ctx.strokeStyle = '#052e16';
      ctx.lineWidth = Math.max(1, W / 300);
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath(); ctx.moveTo(i * cell, 0); ctx.lineTo(i * cell, W); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * cell); ctx.lineTo(W, i * cell); ctx.stroke();
      }

      const validMoves = (!gameOver && canLocalPlay()) ? getOthelloValidMoves(currentTurn) : [];
      validMoves.forEach(m => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.beginPath();
        ctx.arc(m.c * cell + cell / 2, m.r * cell + cell / 2, Math.min(8, cell * 0.12), 0, Math.PI * 2);
        ctx.fill();
      });

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (!board[r][c]) continue;
          ctx.fillStyle = board[r][c] === 1 ? '#0f172a' : '#f8fafc';
          ctx.beginPath();
          ctx.arc(c * cell + cell / 2, r * cell + cell / 2, cell * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // ================= 西瓜棋圍吃演算法 =================
    function getGroupAndLiberties(piecesArr, startIdx) {
      const color = piecesArr[startIdx];
      const visited = new Set([startIdx]);
      const liberties = new Set();
      const queue = [startIdx];

      while (queue.length > 0) {
        const curr = queue.shift();
        for (const nb of WM_ADJ[curr]) {
          if (piecesArr[nb] === 0) {
            liberties.add(nb);
          } else if (piecesArr[nb] === color && !visited.has(nb)) {
            visited.add(nb);
            queue.push(nb);
          }
        }
      }
      return { group: Array.from(visited), liberties: liberties.size };
    }

    function simulateWatermelonMove(piecesArr, fromIdx, toIdx, color) {
      const next = [...piecesArr];
      next[toIdx] = color;
      next[fromIdx] = 0;
      const opp = color === 1 ? 2 : 1;
      let capturedCount = 0;

      // 檢查所有相鄰或全場對手棋群是否已無氣（被包圍）
      for (let i = 0; i < next.length; i++) {
        if (next[i] === opp) {
          const { group, liberties } = getGroupAndLiberties(next, i);
          if (liberties === 0) {
            group.forEach(idx => { next[idx] = 0; capturedCount++; });
          }
        }
      }

      // 檢查自己移動後是否陷入無氣狀態（不可自殺）
      const selfStatus = getGroupAndLiberties(next, toIdx);
      if (selfStatus.liberties === 0 && capturedCount === 0) {
        return null; // 非法自殺步
      }
      return { nextPieces: next, capturedCount };
    }

    function getWatermelonValidMoves(fromIdx, color) {
      if (wmPieces[fromIdx] !== color) return [];
      return WM_ADJ[fromIdx].filter(toIdx => {
        if (wmPieces[toIdx] !== 0) return false;
        return simulateWatermelonMove(wmPieces, fromIdx, toIdx, color) !== null;
      });
    }

    function hasAnyWatermelonMove(color) {
      for (let i = 0; i < wmPieces.length; i++) {
        if (wmPieces[i] === color && getWatermelonValidMoves(i, color).length > 0) return true;
      }
      return false;
    }

    function executeWatermelonMove(fromIdx, toIdx, color, isRemote = false) {
      const sim = simulateWatermelonMove(wmPieces, fromIdx, toIdx, color);
      if (!sim) return false;

      history.push([...wmPieces]);
      wmPieces = sim.nextPieces;
      wmSelectedNode = null;

      if (gameMode === 'online' && !isRemote && conn && conn.open) {
        conn.send({ type: 'WM_MOVE', from: fromIdx, to: toIdx, color });
      }

      if (sim.capturedCount > 0) {
        showToast(`圍吃成功！吃掉對方 ${sim.capturedCount} 顆西瓜子`);
      }

      const opp = color === 1 ? 2 : 1;
      const oppRemain = wmPieces.filter(v => v === opp).length;
      const winnerName = color === 1 ? GAME_META.watermelon.p1 : GAME_META.watermelon.p2;

      if (oppRemain < 3 || !hasAnyWatermelonMove(opp)) {
        gameOver = true;
        updateHUD();
        draw();
        winTitle.textContent = `${winnerName} 獲勝！`;
        winSubtitle.textContent = oppRemain < 3
          ? `對手僅剩 ${oppRemain} 顆棋子，無法再形成包圍`
          : '對手已無路可走！';
        winToast.classList.add('show');
        return true;
      }

      currentTurn = opp;
      updateHUD();
      draw();

      if (gameMode === 'ai' && !gameOver && currentTurn !== myColor) {
        setTimeout(makeAIMove, 420);
      }
      return true;
    }

    // ================= 通用落子邏輯（五子棋/井字棋/黑白棋） =================
    function canLocalPlay() {
      if (gameMode === 'ai') return currentTurn === myColor;
      return conn && conn.open && currentTurn === myColor;
    }

    function handleGridMove(r, c, color, isRemote = false) {
      if (gameOver) return false;

      if (currentGame === 'othello') {
        const flips = getOthelloFlips(r, c, color);
        if (board[r][c] !== 0 || flips.length === 0) return false;
        history.push(board.map(row => [...row]));
        board[r][c] = color;
        flips.forEach(([fr, fc]) => board[fr][fc] = color);
      } else {
        if (board[r][c] !== 0) return false;
        history.push(board.map(row => [...row]));
        board[r][c] = color;
      }

      if (gameMode === 'online' && !isRemote && conn && conn.open) {
        conn.send({ type: 'MOVE', r, c, color });
      }

      if (checkGridOutcome(r, c, color)) {
        updateHUD();
        draw();
        return true;
      }

      let nextTurn = color === 1 ? 2 : 1;
      if (currentGame === 'othello') {
        if (getOthelloValidMoves(nextTurn).length === 0) {
          if (getOthelloValidMoves(color).length === 0) {
            finishOthelloGame();
            return true;
          }
          showToast('對手無處可下，繼續由你落子');
          nextTurn = color;
        }
      }

      currentTurn = nextTurn;
      updateHUD();
      draw();

      if (gameMode === 'ai' && !gameOver && currentTurn !== myColor) {
        setTimeout(makeAIMove, 320);
      }
      return true;
    }

    function checkGridOutcome(r, c, color) {
      const meta = GAME_META[currentGame];
      const winnerName = color === 1 ? meta.p1 : meta.p2;

      if (currentGame === 'gomoku') {
        const prevCount = completedLines.filter(l => l.color === color).length;
        completedLines = scanGomokuLines();
        const newCount = completedLines.filter(l => l.color === color).length;
        if (newCount > prevCount) {
          if (newCount >= targetLines) {
            gameOver = true;
            winTitle.textContent = `${winnerName} 獲勝！`;
            winSubtitle.textContent = `率先累積達成 ${newCount} 條五子連線`;
            winToast.classList.add('show');
            return true;
          } else {
            showToast(`${winnerName}達成五子連線！(${newCount}/${targetLines})`);
          }
        }
      } else if (currentGame === 'tictactoe') {
        const line = checkLineN(r, c, color, rows);
        if (line) {
          gameOver = true; winLineCoords = line;
          winTitle.textContent = `${winnerName} 獲勝！`;
          winSubtitle.textContent = `達成 ${rows} 子連線`;
          winToast.classList.add('show');
          return true;
        }
      } else if (currentGame === 'othello') {
        if (board.every(row => row.every(v => v !== 0))) { finishOthelloGame(); return true; }
      }

      if (currentGame !== 'othello' && board.every(row => row.every(v => v !== 0))) {
        gameOver = true;
        winTitle.textContent = '平局！';
        winSubtitle.textContent = '棋盤已滿，雙方勢均力敵';
        winToast.classList.add('show');
        return true;
      }
      return false;
    }

    function finishOthelloGame() {
      gameOver = true;
      let c1 = 0, c2 = 0;
      board.forEach(r => r.forEach(v => { if (v === 1) c1++; if (v === 2) c2++; }));
      winTitle.textContent = c1 > c2 ? '黑棋獲勝！' : (c2 > c1 ? '白棋獲勝！' : '平局！');
      winSubtitle.textContent = `最終比數：黑棋 ${c1} 子 vs 白棋 ${c2} 子`;
      winToast.classList.add('show');
      updateHUD(); draw();
    }

    function checkLineN(r, c, color, targetN) {
      const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
      for (const [dr, dc] of dirs) {
        const line = [{ r, c }];
        let nr = r + dr, nc = c + dc;
        while (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === color) {
          line.push({ r: nr, c: nc }); nr += dr; nc += dc;
        }
        nr = r - dr; nc = c - dc;
        while (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === color) {
          line.unshift({ r: nr, c: nc }); nr -= dr; nc -= dc;
        }
        if (line.length >= targetN) return line;
      }
      return null;
    }

    function scanGomokuLines() {
      const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
      const found = [], seen = new Set();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const color = board[r][c];
          if (!color) continue;
          for (const [dr, dc] of dirs) {
            const er = r + dr * 4, ec = c + dc * 4;
            if (er < 0 || er >= rows || ec < 0 || ec >= cols) continue;
            let ok = true; const cells = [];
            for (let s = 0; s < 5; s++) {
              if (board[r + dr * s][c + dc * s] !== color) { ok = false; break; }
              cells.push(`${r + dr * s},${c + dc * s}`);
            }
            if (ok) {
              const pr = r - dr, pc = c - dc;
              if (pr >= 0 && pr < rows && pc >= 0 && pc < cols && board[pr][pc] === color) continue;
              const id = `${color}:${cells.join('|')}`;
              if (!seen.has(id)) { seen.add(id); found.push({ id, color, start: { r, c }, end: { r: er, c: ec } }); }
            }
          }
        }
      }
      return found;
    }

    function getOthelloFlips(r, c, color) {
      const opp = color === 1 ? 2 : 1;
      const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
      let totalFlips = [];
      for (const [dr, dc] of dirs) {
        let nr = r + dr, nc = c + dc, temp = [];
        while (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === opp) {
          temp.push([nr, nc]); nr += dr; nc += dc;
        }
        if (temp.length > 0 && nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === color) {
          totalFlips = totalFlips.concat(temp);
        }
      }
      return totalFlips;
    }

    function getOthelloValidMoves(color) {
      const moves = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (board[r][c] === 0 && getOthelloFlips(r, c, color).length > 0) moves.push({ r, c });
        }
      }
      return moves;
    }

    // ================= 智慧 AI =================
    function makeAIMove() {
      if (gameOver || gameMode !== 'ai') return;
      const ai = myColor === 1 ? 2 : 1;

      if (currentGame === 'watermelon') {
        const allMoves = [];
        for (let from = 0; from < wmPieces.length; from++) {
          if (wmPieces[from] === ai) {
            getWatermelonValidMoves(from, ai).forEach(to => {
              const sim = simulateWatermelonMove(wmPieces, from, to, ai);
              // 優先選擇能吃掉對手棋子、其次往中心靠攏的步法
              const centerScore = to === 0 ? 15 : (to <= 4 ? 8 : 0);
              allMoves.push({ from, to, score: sim.capturedCount * 100 + centerScore + Math.random() * 10 });
            });
          }
        }
        if (allMoves.length > 0) {
          allMoves.sort((a, b) => b.score - a.score);
          executeWatermelonMove(allMoves[0].from, allMoves[0].to, ai);
        }
        return;
      }

      if (currentGame === 'othello') {
        const moves = getOthelloValidMoves(ai);
        if (moves.length === 0) return;
        moves.sort((a, b) => {
          const cornerA = (a.r === 0 || a.r === rows - 1) && (a.c === 0 || a.c === cols - 1) ? 100 : 0;
          const cornerB = (b.r === 0 || b.r === rows - 1) && (b.c === 0 || b.c === cols - 1) ? 100 : 0;
          return (cornerB + getOthelloFlips(b.r, b.c, ai).length) - (cornerA + getOthelloFlips(a.r, a.c, ai).length);
        });
        handleGridMove(moves[0].r, moves[0].c, ai);
        return;
      }

      const targetN = currentGame === 'tictactoe' ? rows : 5;
      let best = -Infinity, picks = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (board[r][c] !== 0) continue;
          const atk = evalCell(r, c, ai, targetN);
          const def = evalCell(r, c, myColor, targetN);
          const centerBonus = (rows - Math.abs(r - rows / 2) - Math.abs(c - cols / 2));
          const score = atk * 1.15 + def + centerBonus + Math.random() * 12;
          if (score > best) { best = score; picks = [{ r, c }]; }
        }
      }
      if (picks.length > 0) handleGridMove(picks[0].r, picks[0].c, ai);
    }

    function evalCell(r, c, color, targetN) {
      const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
      let s = 0;
      for (const [dr, dc] of dirs) {
        let cnt = 1;
        let nr = r + dr, nc = c + dc;
        while (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === color) { cnt++; nr += dr; nc += dc; }
        nr = r - dr; nc = c - dc;
        while (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === color) { cnt++; nr -= dr; nc -= dc; }
        if (cnt >= targetN) s += 100000;
        else if (cnt === targetN - 1) s += 5000;
        else s += cnt * 80;
      }
      return s;
    }

    // ================= 滑鼠與觸控點擊映射 =================
    function getNormalizedPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        nx: (clientX - rect.left) / rect.width,
        ny: (clientY - rect.top) / rect.height,
        x: ((clientX - rect.left) / rect.width) * canvas.width,
        y: ((clientY - rect.top) / rect.height) * canvas.height
      };
    }

    canvas.addEventListener('mousemove', e => {
      if (currentGame !== 'gomoku') return;
      const { x, y } = getNormalizedPos(e);
      const pad = canvas.width * 0.065;
      const cell = (canvas.width - pad * 2) / (rows - 1);
      const c = Math.round((x - pad) / cell), r = Math.round((y - pad) / cell);
      hoverCell = (r >= 0 && r < rows && c >= 0 && c < cols) ? { r, c } : null;
      draw();
    });

    canvas.addEventListener('mouseleave', () => { hoverCell = null; draw(); });

    canvas.addEventListener('click', e => {
      if (gameOver || !canLocalPlay()) return;
      const { nx, ny, x, y } = getNormalizedPos(e);

      if (currentGame === 'watermelon') {
        // 尋找點擊最近的西瓜棋節點
        let nearestIdx = -1, minDist = 0.065;
        WM_NODES.forEach((pt, idx) => {
          const d = Math.hypot(nx - pt.x, ny - pt.y);
          if (d < minDist) { minDist = d; nearestIdx = idx; }
        });
        if (nearestIdx === -1) return;

        // 點選自己的棋子進行選取或切換
        if (wmPieces[nearestIdx] === myColor) {
          wmSelectedNode = (wmSelectedNode === nearestIdx) ? null : nearestIdx;
          draw();
        } else if (wmSelectedNode !== null && wmPieces[nearestIdx] === 0) {
          // 嘗試移動到該空節點
          executeWatermelonMove(wmSelectedNode, nearestIdx, myColor);
        }
        return;
      }

      if (currentGame === 'gomoku') {
        const pad = canvas.width * 0.065;
        const cell = (canvas.width - pad * 2) / (rows - 1);
        const c = Math.round((x - pad) / cell), r = Math.round((y - pad) / cell);
        if (r >= 0 && r < rows && c >= 0 && c < cols) handleGridMove(r, c, myColor);
      } else {
        const c = Math.floor(x / (canvas.width / cols));
        const r = Math.floor(y / (canvas.height / rows));
        if (r >= 0 && r < rows && c >= 0 && c < cols) handleGridMove(r, c, myColor);
      }
    });

    // ================= 悔棋與連線控制 =================
    function performUndo(isRemote = false) {
      if (history.length === 0 || gameOver) return;
      if (gameMode === 'ai') {
        const steps = history.length >= 2 ? 2 : 1;
        for (let i = 0; i < steps; i++) {
          const prev = history.pop();
          if (currentGame === 'watermelon') wmPieces = prev;
          else board = prev;
        }
        currentTurn = myColor;
      } else {
        const prev = history.pop();
        if (currentGame === 'watermelon') wmPieces = prev;
        else board = prev;
        currentTurn = currentTurn === 1 ? 2 : 1;
        if (!isRemote && conn && conn.open) conn.send({ type: 'UNDO' });
      }
      wmSelectedNode = null;
      if (currentGame === 'gomoku') completedLines = scanGomokuLines();
      updateHUD(); draw();
    }

    document.getElementById('undoBtn').onclick = () => performUndo(false);

    function syncAndReset() {
      initGame();
      if (gameMode === 'online' && conn && conn.open && isRoomHost) {
        conn.send({ type: 'SYNC', game: currentGame, rows, targetLines });
      }
    }

    document.getElementById('restartBtn').onclick = syncAndReset;
    document.getElementById('modalRestartBtn').onclick = syncAndReset;
    boardSizeSelect.onchange = syncAndReset;
    gridSizeSelect.onchange = () => {
      selectedGridSizes[currentGame] = Number(gridSizeSelect.value);
      syncAndReset();
    };
    targetLinesSelect.onchange = syncAndReset;
    aiDifficultySelect.onchange = initGame;
    playerColorSelect.onchange = initGame;

    function openSetup(mode) {
      setupMode = mode;
      gameMode = mode === 'ai' ? 'ai' : 'online';
      homeScreen.classList.add('hidden');
      appContainer.classList.add('hidden');
      setupScreen.classList.remove('hidden');
      setupModeBadge.textContent = {
        ai: 'AI 對戰設定',
        create: '建立房間設定',
        join: '加入房間設定'
      }[mode];
      setupGameOptions.classList.toggle('hidden', mode === 'join');
      aiSettingsBox.classList.toggle('hidden', mode !== 'ai');
      onlineSetupNote.classList.toggle('hidden', mode !== 'create');
      joinRoomSetup.classList.toggle('hidden', mode !== 'join');
      joinRoomError.classList.add('hidden');
      initGame();
    }

    function closeConnection() {
      if (peer) {
        peer.destroy();
        peer = null;
      }
      conn = null;
      isRoomHost = false;
      myColor = 1;
      gameMode = 'ai';
      setupMode = 'ai';
      myRoomIdEl.textContent = '尚未建立';
      copyLinkBtn.disabled = true;
      copyLinkBtn.textContent = '複製邀請網址';
      networkStatus.textContent = '狀態：建立房間中...';
      networkStatus.classList.remove('connected');
    }

    function returnToHome() {
      homeScreen.classList.remove('hidden');
      setupScreen.classList.add('hidden');
      appContainer.classList.add('hidden');
      closeConnection();
    }

    gameBtns.forEach(btn => {
      btn.onclick = () => {
        gameBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentGame = btn.dataset.game;
        initGame();
      };
    });

    document.getElementById('startSoloBtn').onclick = () => openSetup('ai');
    document.getElementById('startOnlineBtn').onclick = () => openSetup('create');
    joinRoomBtn.onclick = () => openSetup('join');
    roomCodeInput.addEventListener('input', () => joinRoomError.classList.add('hidden'));
    startGameBtn.onclick = () => {
      const roomId = roomCodeInput.value.trim();
      if (setupMode === 'join' && !roomId) {
        joinRoomError.textContent = '請輸入朋友提供的房間代碼。';
        joinRoomError.classList.remove('hidden');
        roomCodeInput.focus();
        return;
      }

      setupScreen.classList.add('hidden');
      appContainer.classList.remove('hidden');
      onlineSettingsBox.classList.toggle('hidden', gameMode !== 'online');
      roomOwnerInfo.classList.toggle('hidden', setupMode !== 'create');
      initGame();
      if (setupMode === 'create') createRoom();
      if (setupMode === 'join') joinRoom(roomId);
    };

    setupBackHomeBtn.onclick = () => {
      setupScreen.classList.add('hidden');
      homeScreen.classList.remove('hidden');
    };
    backHomeBtn.onclick = returnToHome;

    function setupConn(c) {
      conn = c;
      conn.on('open', () => {
        networkStatus.textContent = isRoomHost ? '狀態：對手已加入！你執【先手】' : '狀態：已連入房間！你執【後手】';
        networkStatus.classList.add('connected');
        if (isRoomHost) { myColor = 1; syncAndReset(); }
        else { myColor = 2; }
        updateHUD();
      });
      conn.on('data', data => {
        if (data.type === 'SYNC') {
          currentGame = data.game;
          gameBtns.forEach(b => b.classList.toggle('active', b.dataset.game === currentGame));
          if (currentGame === 'gomoku') {
            boardSizeSelect.value = String(data.rows);
          } else if (GRID_SIZES[currentGame]) {
            selectedGridSizes[currentGame] = Number(data.rows);
          }
          targetLinesSelect.value = String(data.targetLines);
          initGame();
        } else if (data.type === 'MOVE') {
          handleGridMove(data.r, data.c, data.color, true);
        } else if (data.type === 'WM_MOVE') {
          executeWatermelonMove(data.from, data.to, data.color, true);
        } else if (data.type === 'UNDO') {
          performUndo(true);
        }
      });
      conn.on('close', () => {
        networkStatus.textContent = '狀態：對手已離線';
        networkStatus.classList.remove('connected');
        updateHUD();
      });
    }

    function createRoom() {
      if (peer) peer.destroy();
      isRoomHost = true; myColor = 1;
      const code = 'BG-' + Math.random().toString(36).substring(2, 7).toUpperCase();
      networkStatus.textContent = '狀態：註冊房號中...';
      peer = new Peer(code);
      peer.on('error', handlePeerError);
      peer.on('open', id => {
        myRoomIdEl.textContent = id;
        copyLinkBtn.disabled = false;
        networkStatus.textContent = '狀態：房間已建立！複製網址傳給朋友即可開戰';
      });
      peer.on('connection', setupConn);
    }

    function handlePeerError(error) {
      networkStatus.textContent = error.type === 'peer-unavailable'
        ? '狀態：找不到此房間，請確認房間代碼。'
        : `狀態：連線失敗（${error.type}）`;
      networkStatus.classList.remove('connected');
    }

    copyLinkBtn.onclick = () => {
      const url = `${window.location.origin}${window.location.pathname}?room=${myRoomIdEl.textContent}`;
      navigator.clipboard.writeText(url).then(() => {
        copyLinkBtn.textContent = '已複製！';
        setTimeout(() => copyLinkBtn.textContent = '複製邀請網址', 2000);
      });
    };

    function joinRoom(id) {
      const clean = id.trim();
      if (!clean) return;
      if (peer) peer.destroy();
      isRoomHost = false; myColor = 2;
      networkStatus.textContent = `狀態：連線至 ${clean}...`;
      peer = new Peer();
      peer.on('error', handlePeerError);
      peer.on('open', () => setupConn(peer.connect(clean)));
    }

    window.addEventListener('DOMContentLoaded', () => {
      const roomParam = new URLSearchParams(window.location.search).get('room');
      if (roomParam) {
        homeScreen.classList.add('hidden');
        setupScreen.classList.add('hidden');
        appContainer.classList.remove('hidden');
        gameMode = 'online';
        setupMode = 'join';
        onlineSettingsBox.classList.remove('hidden');
        roomOwnerInfo.classList.add('hidden');
        initGame();
        joinRoom(roomParam);
      } else {
        initGame();
      }
    });
  