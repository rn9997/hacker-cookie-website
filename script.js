let loc = 0;
    let cryptons = 0;
    let computers = 0;
    let locPerSec = 0;

    const upgrades = {
      juniorDev: { cost: 50, rate: 1 },
      gpuMiner: { cost: 200, rate: 3 },
      autoScript: { cost: 1000, rate: 10 },
      quantumServer: { cryptons: 10, rate: 100 }
    };

    function clickCode() {
      loc++;
      updateDisplay();
    }

    function buyUpgrade(type) {
      const up = upgrades[type];
      if (type === 'quantumServer') {
        if (cryptons >= up.cryptons) {
          cryptons -= up.cryptons;
          locPerSec += up.rate;
        }
      } else {
        if (loc >= up.cost) {
          loc -= up.cost;
          locPerSec += up.rate;
        }
      }
      updateDisplay();
    }

    function buildComputer() {
      if (loc >= 10000) {
        loc -= 10000;
        computers++;
        updateDisplay();
      }
    }

    function sellComputer() {
      if (computers > 0) {
        computers--;
        cryptons++;
        updateDisplay();
      }
    }

    function updateDisplay() {
      document.getElementById("loc").textContent = Math.floor(loc);
      document.getElementById("cryptons").textContent = cryptons;
      document.getElementById("computers").textContent = computers;
      document.getElementById("locPerSec").textContent = locPerSec;
    }

    setInterval(() => {
      loc += locPerSec / 10;
      updateDisplay();
    }, 100);

    function saveGame() {
      const saveData = {
        loc,
        cryptons,
        computers,
        locPerSec
      };
      localStorage.setItem('hackerTycoonSave', JSON.stringify(saveData));
      alert("Game saved!");
    }

    function loadGame() {
      const saveData = JSON.parse(localStorage.getItem('hackerTycoonSave'));
      if (saveData) {
        loc = saveData.loc || 0;
        cryptons = saveData.cryptons || 0;
        computers = saveData.computers || 0;
        locPerSec = saveData.locPerSec || 0;
        updateDisplay();
        alert("Game loaded!");
      } else {
        alert("No save data found.");
      }
    }

    function resetGame() {
      if (confirm("Are you sure you want to reset your progress?")) {
        loc = 0;
        cryptons = 0;
        computers = 0;
        locPerSec = 0;
        localStorage.removeItem('hackerTycoonSave');
        updateDisplay();
        alert("Game reset.");
      }
    }
