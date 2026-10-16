const UI = {
  de: {
    language: 'Sprache', soundOff: 'Ambiente aus', soundOn: 'Ambiente an',
    eyebrow: 'INTERAKTIVES MUSIKARCHIV · AUSGABE 01', titleA: 'IKONEN.', titleB: 'HYM­NEN.', titleC: 'GESCHICHTEN.',
    intro: 'Zehn Stimmen. Fünfzig Songs. Öffne jede Akte und entdecke, was hinter den Hits steckt.',
    enter: 'Akte öffnen', artists: 'Künstler', songs: 'Songs', languages: 'Sprachen', scroll: 'ENTDECKEN',
    dossier: 'KÜNSTLERAKTE', essential: '5 ESSENTIAL TRACKS', choose: 'Wähle einen Track', back: 'Zurück',
    story: 'HÖRNOTIZEN', released: 'Erschienen', preview: 'Auf Apple Music suchen ↗', pause: 'Pause', unavailable: 'Keine Vorschau verfügbar',
    searching: 'Suche Vorschau …', members: 'Mitglieder', nowPlaying: 'JETZT', next: 'Nächster Künstler', source: 'Cover & Hörprobe via Apple Music',
    loadError: 'Bild konnte nicht geladen werden', audioError: 'Dieser Titel ist in deiner Region nicht als Vorschau verfügbar.'
  },
  en: {
    language: 'Language', soundOff: 'Ambience off', soundOn: 'Ambience on',
    eyebrow: 'INTERACTIVE MUSIC ARCHIVE · ISSUE 01', titleA: 'ICONS.', titleB: 'ANTHEMS.', titleC: 'STORIES.',
    intro: 'Ten voices. Fifty songs. Open every dossier and discover what lives behind the hits.',
    enter: 'Open dossier', artists: 'Artists', songs: 'Songs', languages: 'Languages', scroll: 'DISCOVER',
    dossier: 'ARTIST DOSSIER', essential: '5 ESSENTIAL TRACKS', choose: 'Choose a track', back: 'Back',
    story: 'LISTENING NOTES', released: 'Released', preview: 'Find on Apple Music ↗', pause: 'Pause', unavailable: 'Preview unavailable',
    searching: 'Finding preview …', members: 'Members', nowPlaying: 'NOW', next: 'Next artist', source: 'Artwork & preview via Apple Music',
    loadError: 'Image unavailable', audioError: 'This track has no preview in your region.'
  },
  zh: {
    language: '语言', soundOff: '氛围音关闭', soundOn: '氛围音开启',
    eyebrow: '互动音乐档案 · 第 01 期', titleA: '偶像。', titleB: '金曲。', titleC: '故事。',
    intro: '十组音乐人，五十首代表作。打开每份档案，发现热门歌曲背后的故事。',
    enter: '打开档案', artists: '音乐人', songs: '歌曲', languages: '语言', scroll: '开始探索',
    dossier: '音乐人档案', essential: '5 首代表作', choose: '选择一首歌曲', back: '返回',
    story: '歌曲解读', released: '发行年份', preview: '前往 Apple Music 搜索 ↗', pause: '暂停', unavailable: '暂无试听',
    searching: '正在查找试听…', members: '成员', nowPlaying: '正在播放', next: '下一位音乐人', source: '封面与试听来自 Apple Music',
    loadError: '图片暂不可用', audioError: '你所在地区暂不提供这首歌的试听。'
  }
};

Object.assign(UI.de, {
  intro: 'Zehn Künstler. Fünfzig ausgewählte Songs. Entdecke Klang, Stimmung und Motive hinter den Tracks.',
  essential: '5 AUSGEWÄHLTE TRACKS', source: 'Eigenes Poster · kein offizielles Cover',
  independent: 'Unabhängiges Portfolio-Projekt. Keine Verbindung zu Künstlern oder Labels.',
  rights: 'Quellen & Rechte', photoCredits: 'Fotografien & Lizenzen',
  photoChanges: 'Bildanpassungen: Zuschnitt, Graustufen und Kontrast. CC-BY-SA-Anpassungen behalten die angegebene Lizenz.',
  editorial: 'Redaktionelle Interpretation; kein Künstlerzitat.',
  ambienceHint: 'Originaler synthetischer Ambient-Loop; keine Aufnahme der ausgewählten Songs.',
  audioError: 'Ambient-Audio ist in diesem Browser nicht verfügbar.'
});
Object.assign(UI.en, {
  intro: 'Ten artists. Fifty selected songs. Explore the sound, mood and themes behind each track.',
  essential: '5 SELECTED TRACKS', source: 'Original poster · not official album artwork',
  independent: 'Independent portfolio project. Not affiliated with artists or labels.',
  rights: 'Sources & rights', photoCredits: 'Photo credits & licenses',
  photoChanges: 'Photo treatments: cropping, grayscale and contrast. CC BY-SA adaptations retain the indicated license.',
  editorial: 'Editorial interpretation, not an artist quotation.',
  ambienceHint: 'Original synthesized ambient loop; not a recording of the featured songs.',
  audioError: 'Ambient audio is unavailable in this browser.'
});
Object.assign(UI.zh, {
  intro: '十组音乐人，五十首精选曲目。打开档案，探索每首歌的声音、情绪与主题。',
  essential: '5 首精选曲目', source: '原创排版海报 · 非官方唱片封面',
  independent: '独立求职展示项目，与歌手及唱片公司无关联。',
  rights: '来源与权利说明', photoCredits: '照片署名与许可证',
  photoChanges: '照片处理：裁切、灰度和对比度调整。CC BY-SA 图片改编沿用所列许可证。',
  editorial: '编辑性解读，不是歌手本人引述。',
  ambienceHint: '原创合成氛围音，不是所展示歌曲的录音。',
  audioError: '当前浏览器暂不支持播放氛围音。'
});

const ARTISTS = [
  {
    id: 'bts', name: 'BTS', wiki: 'BTS', accent: '#a970ff', genre: 'K-POP / POP', years: '2013—',
    members: 'RM · Jin · SUGA · j-hope · Jimin · V · Jung Kook',
    blurb: { de: 'Sieben Perspektiven, eine globale Bewegung.', en: 'Seven perspectives, one global movement.', zh: '七种视角，一场席卷全球的音乐浪潮。' },
    songs: [
      song('Dynamite', 2020, 'Disco-Pop', 'Als englischsprachiger Lichtblick in einer schwierigen Zeit gedacht, verbindet der Song Retro-Disco mit purem Optimismus.', 'Built as an English-language burst of light during a difficult year, the song pairs retro disco with pure optimism.', '这首全英文歌曲诞生于特殊时期，用复古迪斯科和纯粹的乐观传递能量。'),
      song('Butter', 2021, 'Dance-Pop', 'Ein selbstbewusster Sommertrack: butterweiche Hooks, Charme und eine Performance, die Leichtigkeit zur Haltung macht.', 'A confident summer track: smooth hooks, charm, and a performance that turns effortlessness into an attitude.', '一首自信的夏日舞曲，以丝滑旋律和充满魅力的表演，把轻盈变成一种态度。'),
      song('Boy With Luv', 2019, 'Pop', 'Mit Halsey richtet BTS den Blick auf die kleinen Dinge der Liebe statt auf große, unerreichbare Gesten.', 'With Halsey, BTS turns toward the small details of love instead of grand, unreachable gestures.', 'BTS 与 Halsey 把目光投向爱情里的微小细节，而非遥不可及的宏大表达。'),
      song('DNA', 2017, 'EDM / Pop', 'Pfeifmotiv und elektronische Energie erzählen von einer Verbindung, die sich so unausweichlich wie genetischer Code anfühlt.', 'A whistle motif and electronic energy frame a connection that feels as inevitable as genetic code.', '口哨旋律与电子能量描绘了一种如同基因密码般命中注定的联结。'),
      song('Spring Day', 2017, 'Alt-Pop', 'Sehnsucht, Verlust und die Hoffnung auf ein Wiedersehen verdichten sich zu einer warmen Metapher vom Ende des Winters.', 'Longing, loss, and hope for reunion become a warm metaphor about winter finally ending.', '思念、失去与重逢的希望，被浓缩成冬天终将结束的温暖隐喻。')
    ]
  },
  {
    id: 'imagine-dragons', name: 'Imagine Dragons', wiki: 'Imagine Dragons', accent: '#ff5138', genre: 'ALT ROCK / POP', years: '2008—',
    blurb: { de: 'Stadiongroße Gefühle mit elektronischem Puls.', en: 'Stadium-sized emotion with an electronic pulse.', zh: '体育场级别的情绪，配上电子脉搏。' },
    songs: [
      song('Radioactive', 2012, 'Alternative Rock', 'Die Band übersetzte persönliche Umbrüche in ein apokalyptisches Erwachen – mit massiven Drums und Dubstep-Kanten.', 'The band translated personal upheaval into an apocalyptic awakening, powered by huge drums and dubstep edges.', '乐队把个人剧变写成末日般的觉醒，以重鼓点和电子音色制造冲击。'),
      song('Believer', 2017, 'Arena Rock', 'Schmerz wird nicht versteckt, sondern zum Motor: Jede Strophe verwandelt Widerstand in Selbstdefinition.', 'Pain is not hidden but used as fuel; every verse transforms resistance into self-definition.', '痛苦没有被隐藏，而是成为燃料；每一段歌词都把逆境转化为自我定义。'),
      song('Demons', 2012, 'Pop Rock', 'Die leise Seite der Band: eine Warnung an geliebte Menschen vor den eigenen dunklen, schwer kontrollierbaren Anteilen.', 'The band at its most intimate: a warning to loved ones about the darker parts of the self.', '这是乐队更内省的一面：提醒所爱之人，自己也有难以控制的黑暗部分。'),
      song('Thunder', 2017, 'Electropop', 'Dan Reynolds blickt auf den Außenseiter zurück, der gegen Erwartungen seinen eigenen Weg in die Musik nahm.', 'Dan Reynolds looks back at the outsider who ignored expectations and chose his own route into music.', '丹·雷诺兹回望那个不被看好的少年，如何无视期待，走出自己的音乐道路。'),
      song('Enemy', 2021, 'Alt-Pop', 'Für Arcane entstanden, kreist der Track um Misstrauen, inneren Druck und das Gefühl, dass Erfolg neue Gegner schafft.', 'Created for Arcane, the track circles mistrust, pressure, and the sense that success creates new enemies.', '歌曲为《英雄联盟：双城之战》创作，围绕不信任、压力与成功带来的敌意展开。')
    ]
  },
  {
    id: 'ariana-grande', name: 'Ariana Grande', wiki: 'Ariana Grande', accent: '#ff7fbe', genre: 'POP / R&B', years: '2008—',
    blurb: { de: 'Vokale Präzision trifft verletzliche Popmoderne.', en: 'Vocal precision meets vulnerable modern pop.', zh: '精准唱功与脆弱而现代的流行表达。' },
    songs: [
      song('thank u, next', 2018, 'Pop / R&B', 'Nach öffentlich diskutierten Beziehungen wählt Grande weder Abrechnung noch Reue, sondern Dankbarkeit und Selbstwachstum.', 'After intensely public relationships, Grande chooses neither revenge nor regret, but gratitude and growth.', '经历备受关注的感情后，她没有选择报复或后悔，而是以感谢和成长回应。'),
      song('7 rings', 2019, 'Trap-Pop', 'Ein spontaner Freundschaftsmoment wurde zur luxuriösen Selbstermächtigung – mit einer Melodie, die My Favorite Things zitiert.', 'A spontaneous moment with friends became a luxurious self-empowerment anthem, quoting the melody of My Favorite Things.', '一次与朋友的即兴消费变成华丽的自我赋权宣言，旋律还借鉴了《My Favorite Things》。'),
      song('no tears left to cry', 2018, 'Dance-Pop', 'Der erste große Song nach dem Anschlag in Manchester sucht Bewegung, Hoffnung und Licht, ohne den Schmerz zu leugnen.', 'Her first major song after the Manchester attack reaches for motion, hope, and light without denying pain.', '曼彻斯特事件后的首支重要作品，在不否认伤痛的同时寻找舞动、希望与光亮。'),
      song('Into You', 2016, 'Dance-Pop', 'Ein präzise gebauter Spannungsbogen aus Flüstern, Synthesizern und einem Refrain, der ungefiltertes Begehren freisetzt.', 'Whispers and synths build a precise arc of tension before the chorus releases unfiltered desire.', '低语与合成器精准累积张力，直到副歌释放毫不掩饰的渴望。'),
      song('positions', 2020, 'R&B / Pop', 'Der Song verbindet romantische Hingabe mit Selbstbestimmung und setzt auf luftige Harmonien statt maximaler Lautstärke.', 'The song blends romantic devotion with agency, favoring airy harmonies over maximum volume.', '歌曲把浪漫投入与自主意识结合，用轻盈和声取代一味追求爆发力。')
    ]
  },
  {
    id: 'ne-yo', name: 'Ne-Yo', wiki: 'Ne-Yo', accent: '#34d7ff', genre: 'R&B / POP', years: '1998—',
    blurb: { de: 'Elegantes Songwriting, gebaut für die Tanzfläche.', en: 'Elegant songwriting, engineered for the dance floor.', zh: '优雅的创作，为舞池而生。' },
    songs: [
      song('So Sick', 2005, 'R&B', 'Eine Trennung verfolgt den Erzähler sogar im Radio: Der Song macht aus alltäglichen Liebesliedern schmerzhafte Trigger.', 'A breakup follows the narrator through the radio, turning everyday love songs into painful triggers.', '失恋甚至通过收音机纠缠着主人公，平常的情歌都成了触发痛苦的开关。'),
      song('Miss Independent', 2008, 'R&B / Pop', 'Ne-Yo feiert eine Partnerin, deren Ehrgeiz und Eigenständigkeit selbst zum stärksten Reiz werden.', 'Ne-Yo celebrates a partner whose ambition and independence become her most magnetic qualities.', 'Ne-Yo 赞美一位有野心且独立的女性，而这些特质正是她最迷人的地方。'),
      song('Closer', 2008, 'Dance-Pop', 'Vom House-Puls getragen, beschreibt der Track Anziehung als hypnotischen Sog, dem Vernunft kaum standhält.', 'Driven by a house pulse, the track describes attraction as a hypnotic pull that reason cannot resist.', '在 House 节拍推动下，歌曲把吸引力写成理智无法抗拒的催眠漩涡。'),
      song('Because of You', 2007, 'R&B', 'Liebe erscheint hier wie eine Abhängigkeit: berauschend, widersprüchlich und trotz aller Warnzeichen unwiderstehlich.', 'Love appears as an addiction: intoxicating, contradictory, and irresistible despite every warning sign.', '爱情在这里像一种成瘾：令人沉醉、充满矛盾，即使警报不断仍无法抗拒。'),
      song('Let Me Love You (Until You Learn to Love Yourself)', 2012, 'EDM / Pop', 'Über einem elektronischen Dance-Beat wird Zuneigung zur Einladung, den eigenen Wert anzunehmen.', 'Over an electronic dance beat, affection becomes an invitation to recognize your own worth.', '在电子舞曲节奏中，爱意化作邀请：希望对方看见自己的价值。')
    ]
  },
  {
    id: 'akon', name: 'Akon', wiki: 'Akon', accent: '#ffd329', genre: 'R&B / HIP-HOP', years: '1996—',
    blurb: { de: 'Eine unverkennbare Stimme zwischen Straße und Weltpop.', en: 'An unmistakable voice between street music and global pop.', zh: '一把游走于街头音乐与全球流行之间的独特嗓音。' },
    songs: [
      song('Smack That', 2006, 'Hip-Hop / R&B', 'Die Zusammenarbeit mit Eminem setzt auf minimale Synths, Clubenergie und den Kontrast zweier sofort erkennbarer Stimmen.', 'The Eminem collaboration runs on minimal synths, club energy, and the contrast of two instantly recognizable voices.', '与 Eminem 的合作以极简合成器和俱乐部能量为主，两种极具辨识度的声音形成反差。'),
      song('Lonely', 2005, 'R&B', 'Ein beschleunigtes Bobby-Vinton-Sample wird zur ungewöhnlichen, fast cartoonhaften Kulisse für echte Reue.', 'A sped-up Bobby Vinton sample becomes an unusual, almost cartoon-like backdrop for genuine regret.', '加速的 Bobby Vinton 采样形成近乎卡通的独特背景，衬托出真实的悔意。'),
      song("Don't Matter", 2006, 'Reggae Fusion', 'Gegen äußeren Widerstand setzt der Song auf Loyalität; der entspannte Reggae-Rhythmus macht Trotz zu Wärme.', 'Against outside resistance, the song chooses loyalty; its easy reggae rhythm turns defiance into warmth.', '面对外界阻力，歌曲选择忠诚；轻松的雷鬼节奏把反抗化为温暖。'),
      song('Right Now (Na Na Na)', 2008, 'Dance-Pop', 'Elektronischer als frühere Hits, verwandelt Akon den Wunsch nach Versöhnung in einen direkten Mitsing-Refrain.', 'More electronic than his earlier hits, Akon turns a wish for reconciliation into an immediate singalong hook.', '比早期作品更电子化，Akon 把渴望复合写成令人立刻跟唱的副歌。'),
      song('Beautiful', 2008, 'Pop / R&B', 'Gemeinsam mit Colby O’Donis und Kardinal Offishall baut Akon eine schimmernde Ode an die Liebe auf den ersten Blick.', 'With Colby O’Donis and Kardinal Offishall, Akon creates a shimmering ode to love at first sight.', '与 Colby O’Donis、Kardinal Offishall 合作，打造一首闪亮的一见钟情颂歌。')
    ]
  },
  {
    id: 'rihanna', name: 'Rihanna', wiki: 'Rihanna', accent: '#ff304f', genre: 'POP / R&B', years: '2003—',
    blurb: { de: 'Popinstinkt, Wandelbarkeit und kompromisslose Präsenz.', en: 'Pop instinct, reinvention, and uncompromising presence.', zh: '流行直觉、不断重塑，以及毫不妥协的存在感。' },
    songs: [
      song('Umbrella', 2007, 'Pop / R&B', 'Die Schutzmetapher und das markante „ella“-Echo gaben Rihanna den Song, der ihren Schritt zur globalen Ikone markierte.', 'Its shelter metaphor and “ella” echo gave Rihanna the song that marked her arrival as a global icon.', '保护伞的隐喻与标志性的“ella”回声，见证 Rihanna 成为全球流行偶像。'),
      song('Diamonds', 2012, 'Pop', 'Sia schrieb die zentrale Hook; statt toxischer Romantik leuchtet der Song mit einer ruhigen, fast spirituellen Zuversicht.', 'Sia wrote the central hook; instead of toxic romance, the song glows with calm, almost spiritual confidence.', 'Sia 写下核心旋律；歌曲摆脱纠缠的爱情叙事，散发平静而近乎精神性的自信。'),
      song('We Found Love', 2011, 'EDM', 'Calvin Harris’ euphorische Produktion kollidiert mit einer Beziehung, die gleichzeitig ekstatisch und zerstörerisch wirkt.', 'Calvin Harris euphoria collides with a relationship that feels ecstatic and destructive at once.', 'Calvin Harris 的狂喜制作，与一段既令人沉醉又具有破坏性的关系正面碰撞。'),
      song('Only Girl (In the World)', 2010, 'Dance-Pop', 'Ein maximalistischer Dance-Track über den Wunsch, im Moment vollkommen und ausschließlich gesehen zu werden.', 'A maximalist dance track about wanting to be seen completely and exclusively in the moment.', '这首极致舞曲写的是一种渴望：在当下被完整、唯一地看见。'),
      song('Work', 2016, 'Dancehall', 'Rihanna rückt ihre karibische Sprachmelodie ins Zentrum; Wiederholung wird zu Rhythmus, Haltung und körperlicher Energie.', 'Rihanna centers her Caribbean cadence, turning repetition into rhythm, attitude, and physical energy.', 'Rihanna 将加勒比语调置于中心，把重复变成节奏、态度与身体能量。')
    ]
  },
  {
    id: 'teddy-swims', name: 'Teddy Swims', wiki: 'Teddy Swims', accent: '#ff9e45', genre: 'SOUL / POP', years: '2019—',
    blurb: { de: 'Eine raue Stimme, die jede offene Wunde hörbar macht.', en: 'A raw voice that makes every open wound audible.', zh: '一副粗粝嗓音，让每一道伤口都清晰可闻。' },
    songs: [
      song('Lose Control', 2023, 'Soul / Pop', 'Gospelharmonien und eine explosive Stimme zeichnen eine Liebe, die sich zugleich wie Rettung und Kontrollverlust anfühlt.', 'Gospel harmonies and an explosive vocal frame a love that feels like rescue and loss of control at once.', '福音和声与爆发嗓音描绘一段爱情：它既像救赎，也像彻底失控。'),
      song('The Door', 2023, 'Soul / Pop', 'Der Moment des Weggehens wird nicht leise erzählt: Bläser, Groove und große Vocals machen Selbstschutz zur Befreiung.', 'Leaving is not quiet here; brass, groove, and huge vocals turn self-preservation into liberation.', '离开并非悄无声息；铜管、律动与强大人声让自我保护变成解放。'),
      song('Bad Dreams', 2024, 'Pop Soul', 'Schlaflosigkeit wird zur Bühne für Verlustangst – getragen von einem pulsierenden, fast filmischen Arrangement.', 'Sleeplessness becomes a stage for fear of loss, carried by a pulsing, cinematic arrangement.', '失眠成为害怕失去的舞台，脉动而电影感十足的编曲托住整首歌。'),
      song("You're Still the One", 2020, 'Soul Cover', 'In seiner Shania-Twain-Interpretation reduziert Swims den Country-Pop-Klassiker auf Stimme, Wärme und gelebte Zärtlichkeit.', 'Swims strips the Shania Twain classic down to voice, warmth, and lived-in tenderness.', '他重新演绎 Shania Twain 的经典，把乡村流行简化为嗓音、温度与真实的温柔。'),
      song('Guilty', 2025, 'Soul / Pop', 'Ein Beichtstuhl aus Soul und Pop: Swims untersucht Verantwortung, Verlangen und die Muster, die Beziehungen beschädigen.', 'A confessional built from soul and pop, examining responsibility, desire, and patterns that damage relationships.', '一座由灵魂乐与流行搭起的忏悔室，审视责任、欲望与伤害关系的惯性。')
    ]
  },
  {
    id: 'britney-spears', name: 'Britney Spears', wiki: 'Britney Spears', accent: '#35e0d0', genre: 'POP', years: '1992—',
    blurb: { de: 'Die Blaupause für Popstars des neuen Jahrtausends.', en: 'The blueprint for the new millennium pop star.', zh: '千禧年流行偶像的标准蓝图。' },
    songs: [
      song('...Baby One More Time', 1998, 'Teen Pop', 'Max Martins Klaviermotiv und doppeldeutige Hook machten aus dem Debüt eine perfekt konstruierte Pop-Zeitenwende.', 'Max Martin’s piano motif and ambiguous hook turned a debut into a perfectly engineered pop turning point.', 'Max Martin 的钢琴动机和双关副歌，让这首出道作成为精密打造的流行转折点。'),
      song('Toxic', 2003, 'Dance-Pop', 'Bollywood-Streicher, Surf-Gitarre und ein atemloser Beat malen Begehren als glamouröses, gefährliches Gift.', 'Bollywood strings, surf guitar, and a breathless beat paint desire as glamorous, dangerous poison.', '宝莱坞弦乐、冲浪吉他与急促节拍，把欲望描绘成华丽而危险的毒药。'),
      song('Oops!... I Did It Again', 2000, 'Pop', 'Die theatralische Fortsetzung ihres Durchbruchs spielt bewusst mit Unschuld, Kontrolle und dem Bild des Popphänomens.', 'The theatrical follow-up to her breakthrough knowingly plays with innocence, control, and pop-star mythology.', '这首戏剧化的续篇有意玩弄天真、控制与流行明星神话之间的张力。'),
      song('Gimme More', 2007, 'Electropop', 'Eine markante gesprochene Einleitung eröffnet einen hypnotischen Clubtrack voller kühler Kontrolle.', 'A distinctive spoken introduction opens a hypnotic club track full of cool control.', '鲜明的念白开启催眠般的舞曲，传递冷静而自信的掌控感。'),
      song('Circus', 2008, 'Electropop', 'Das Leben im Rampenlicht wird zum Zirkus: Britney steht gleichzeitig als Direktorin und Hauptattraktion im Ring.', 'Life in the spotlight becomes a circus, with Britney both ringmaster and main attraction.', '聚光灯下的生活化作马戏团，Britney 同时是驯兽师与最耀眼的主角。')
    ]
  },
  {
    id: 'katy-perry', name: 'Katy Perry', wiki: 'Katy Perry', accent: '#4f8dff', genre: 'POP', years: '2001—',
    blurb: { de: 'Technicolor-Pop mit Refrains für ganze Stadien.', en: 'Technicolor pop with choruses built for stadiums.', zh: '色彩饱和的流行乐，为万人合唱而写。' },
    songs: [
      song('Firework', 2010, 'Pop', 'Ein Song über verborgenen Selbstwert, der seine Botschaft mit aufsteigendem Arrangement und explosivem Refrain inszeniert.', 'A song about hidden self-worth, staged through a rising arrangement and an explosive chorus.', '一首关于内在价值的歌曲，用不断上升的编曲与爆发副歌呈现主题。'),
      song('Roar', 2013, 'Pop', 'Aus dem Gefühl, die eigene Stimme verloren zu haben, entsteht eine einfache, körperliche Metapher für neue Stärke.', 'From the feeling of losing her voice comes a simple, physical metaphor for renewed strength.', '从失去自我声音的感受出发，歌曲用直接有力的隐喻表达重获力量。'),
      song('Teenage Dream', 2010, 'Power Pop', 'Der Song jagt nicht Jugend selbst, sondern das seltene Gefühl, bei jemandem wieder grenzenlos und leicht zu werden.', 'The song chases not youth itself, but the rare feeling of becoming limitless and light with someone.', '歌曲追逐的不是青春本身，而是和某人在一起时重新变得无拘无束的珍贵感觉。'),
      song('California Gurls', 2010, 'Dance-Pop', 'Als sonnige Westküsten-Antwort auf Empire State of Mind entworfen, überzeichnet der Song Kalifornien zur Popfantasie.', 'Designed as a sunny West Coast answer to Empire State of Mind, the song exaggerates California into pop fantasy.', '作为对《Empire State of Mind》的阳光西海岸回应，它把加州夸张成流行幻想。'),
      song('Dark Horse', 2013, 'Trap-Pop', 'Dunkle Trap-Flächen und märchenhafte Bilder drehen das Liebeslied zur Warnung: Wer sich einlässt, muss die Konsequenzen tragen.', 'Dark trap textures and fairy-tale imagery turn a love song into a warning: commitment has consequences.', '阴暗 Trap 质感与童话意象把情歌变成警告：一旦投入，就要承担后果。')
    ]
  },
  {
    id: 'demi-lovato', name: 'Demi Lovato', wiki: 'Demi Lovato', accent: '#bf67ff', genre: 'POP / ROCK', years: '2002—',
    blurb: { de: 'Kraft, Verletzlichkeit und eine Stimme ohne Sicherheitsnetz.', en: 'Power, vulnerability, and a voice without a safety net.', zh: '力量、脆弱，以及毫无保留的声音。' },
    songs: [
      song('Sorry Not Sorry', 2017, 'Pop / R&B', 'Eine kompromisslose Comeback-Pose: Erfolg ist hier die Antwort auf alle, die Zweifel gesät haben.', 'An unapologetic comeback stance where success becomes the answer to everyone who planted doubt.', '一场毫不道歉的回归姿态：用成功回应所有曾经的质疑。'),
      song('Heart Attack', 2013, 'Electropop', 'Die Angst vor Verletzlichkeit wird körperlich: Große Gitarren und Synths spiegeln den Kontrollverlust beim Verlieben.', 'Fear of vulnerability becomes physical, as huge guitars and synths mirror the loss of control in falling in love.', '对脆弱的恐惧变得具象；强烈吉他与合成器映照坠入爱河时的失控。'),
      song('Cool for the Summer', 2015, 'Pop Rock', 'Ein neugieriger, bewusst offener Sommerflirt, dessen Gitarrenriff und Synth-Aufbau jede Grenze in Bewegung setzen.', 'A curious, deliberately open summer flirt whose guitar riff and synth build put every boundary in motion.', '一段好奇而开放的夏日暧昧，吉他与合成器推动边界不断移动。'),
      song('Skyscraper', 2011, 'Pop Ballad', 'Eine verletzliche Stimme macht Überleben zum Bild eines Hochhauses, das nach dem Sturm steht.', 'A vulnerable vocal turns survival into the image of a skyscraper still standing after the storm.', '脆弱而有力的嗓音，把幸存写成风暴后依旧矗立的摩天大楼。'),
      song('Confident', 2015, 'Pop Rock', 'Marschierende Drums und Bläser stellen eine direkte Frage: Warum sollte Selbstvertrauen überhaupt etwas Negatives sein?', 'Marching drums and brass ask a direct question: why should confidence ever be treated as a bad thing?', '行进鼓与铜管抛出直接问题：为什么自信要被视作坏事？')
    ]
  }
];

function song(title, year, style, de, en, zh) {
  return { title, year, style, story: { de, en, zh } };
}
