    const STORAGE_KEY = 'mySecretDiary_v2';
    const MASTER_PASS = "Rohit@123";
    const THEME_KEY = "theme";

/* LOAD THEME BEFORE LOGIN */
(function(){
    const savedTheme = localStorage.getItem(THEME_KEY);
    if(savedTheme === "dark"){
        document.body.classList.add("dark");
    }
})();

/* THEME TOGGLE */
function toggleTheme(){
    document.body.classList.toggle("dark");
    const mode = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem(THEME_KEY, mode);
}

    function showMessage(msg, type) {
        const status = document.getElementById('status');
        status.innerText = msg;
        status.className = type;
        setTimeout(() => {
            status.innerText = "";
            status.className = "";
        }, 4000);
    }

    function saveEntry() {
        const input = document.getElementById('diaryInput');
        const entry = input.value.trim();

        if (!entry) {
            showMessage("Write something with your love first! 😍", "error");
            return;
        }

        const date = new Date().toLocaleString([], { 
            year: 'numeric', month: 'short', day: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        });
        
        const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        savedData.push({ date, content: entry });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));

        input.value = "";
        showMessage("Your heart's words are safely locked away. 💘📝", "success");
    }

    function showPasswordModal() {
        document.getElementById('passwordModal').style.display = 'flex';
        document.getElementById('passInput').focus();
    }

    function closeModal() {
        document.getElementById('passwordModal').style.display = 'none';
        document.getElementById('passInput').value = '';
    }

    function verifyPassword() {
        const pass = document.getElementById('passInput').value;
        if (pass === MASTER_PASS) {
            closeModal();
            renderEntries();
        } else {
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.animation = 'none';
            void modalContent.offsetWidth; // trigger reflow
            modalContent.style.animation = 'slideUp 1.3s ease-out';
            showMessage("Wrong password! Don't force open my heart. 💞", "error");
            document.getElementById('passInput').value = '';
        }
    }

    function renderEntries() {
        const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const displayArea = document.getElementById('entriesDisplay');
        const listArea = document.getElementById('entriesList');

        if (savedData.length === 0) {
            showMessage("No memories saved yet. Start writing! 😟", "error");
            return;
        }

        listArea.innerHTML = "";
        [...savedData].reverse().forEach(entry => {
            const card = document.createElement('div');
            card.className = 'entry-card';
            card.innerHTML = `
                <span class="entry-date">${entry.date}</span>
                <p style="margin: 0; line-height: 1.5;">${entry.content}</p>
            `;
            listArea.appendChild(card);
        });

        displayArea.style.display = "block";
        displayArea.scrollIntoView({ behavior: 'smooth' });
        showMessage("Welcome back, Sweetheart! 💋💖", "success");
    }

    function closeEntries() {
        document.getElementById('entriesDisplay').style.display = 'none';
    }

    // Allow "Enter" key for password
    document.getElementById('passInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyPassword();
    });
    
        /* 💖 EMOJIS FLOAT */
    const emojis = ["💖","✨","🌸","🦋","💕","💓", "💘", "🩷"];
    setInterval(()=>{
        let e = document.createElement("div");
        e.className = "heart";
        e.innerText = emojis[Math.floor(Math.random()*emojis.length)];
        e.style.left = Math.random()*100 + "vw";
        e.style.fontSize = (15 + Math.random()*25) + "px";
        e.style.animationDuration = (5 + Math.random()*5) + "s";
        document.body.appendChild(e);
        setTimeout(() => e.remove(), 10000);
    }, 600);

    /* ✨ SPARKLES */
    setInterval(()=>{
        let s = document.createElement("div");
        s.className = "sparkle";
        s.style.left = Math.random()*100 + "vw";
        s.style.top = Math.random()*100 + "vh";
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 2000);
    }, 400);

    /* MOUSE TRAIL */
    document.addEventListener("mousemove", e => {
        let t = document.createElement("div");
        t.className = "sparkle";
        t.style.left = e.clientX + "px";
        t.style.top = e.clientY + "px";
        t.style.background = "var(--primary)";
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 800);
    });

    /* SUCCESS BURST */
    function burst(){
        for(let i=0; i<30; i++){
            let b = document.createElement("div");
            b.className = "heart";
            b.innerText = "✨";
            b.style.left = "50vw";
            b.style.bottom = "50vh";
            b.style.fontSize = "24px";
            // Random scatter
            const x = (Math.random() - 0.5) * 400;
            const y = (Math.random() - 0.5) * 400;
            b.style.transform = `translate(${x}px, ${y}px)`;
            b.style.animation = "sparkleAnim 1s ease-out forwards";
            document.body.appendChild(b);
            setTimeout(() => b.remove(), 1000);
        }
    }
    
 //   Pop-up Close Function 
        function closePopup(id) {
            document.getElementById(id).style.display = 'none';
        }

    function confirmLeave() {
    return confirm("Are you sure you want to leave?");
}
