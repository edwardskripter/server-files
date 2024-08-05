let datas = {
  categori: null,
  noescape: false,
  questindex: 1,
  lastindex: 0,
  questcurtip: null,
  questions_right: {
    corecte: 0,
    gresite: 0,
  },
};
let dmv;

mp.events.add("startDMV", () => {
  if (!dmv) {
    dmv = mp.browsers.new("package://dmv/index.html");
    setupPAGE();
    dmv.execute(`
      $(document).ready(function() {
        $('.start_button3').on('click', function() {
          mp.trigger('start_chest', 3);
        });
      });
    `);
  }
});

mp.events.add("start_chest", (tip) => {
  start_chest(tip);
});


let interval;

function setupPAGE() {
  dmv.execute(`$("html,body").fadeIn();`);
  dmv.execute(`$(".cont_prima_pagina").fadeIn();`);
  datas = {
    capthca: false,
    categori: null,
    noescape: false,
    questindex: 1,
    lastindex: 0,
    questcurtip: null,
    questions_right: {
      corecte: 0,
      gresite: 0,
    }
  };
  dmv.execute(`$(".categori_selected").removeClass("categori_selected");`);
  setupEventHandlers();
}

let remainingindex = [];
let answered_questions = [];

function start_chest(tip) {
  if (tip == 1) {
    if (datas.capthca == true && datas.categori != null) {
      dmv.execute(`$(".cont_prima_pagina").fadeOut();`);
      setTimeout(() => {
        dmv.execute(`$(".cont_adoua_pagina").fadeIn();`);
      }, 500);
    }
  } else if (tip == 3) {
    dmv.destroy();
    remainingindex = [];
    answered_questions = [];
    dmv.execute(`$(".hideelement").hide();`);
    datas.questcurtip = "acomodare";
    datas.questindex = 1;
    datas.lastindex = Object.keys(Intreb[datas.questcurtip]).length;
    dmv.execute(`$(".cont_acomodare_pagina").fadeIn();`);
    dmv.execute(`$("#curpage_acomodare").attr("class", "cont_page acomodation");`);
    dmv.execute(`
      $("#cont_header").html(
        '<h1 id="acomodare_header">Bine ati venit la examenul auto!</h1>'
      );
    `);
    datas.questions_right = {
      corecte: 0,
      gresite: 0,
    };
    Intreb[datas.questcurtip] = randomizeTable(Intreb[datas.questcurtip]);
    quest_nextone();
  } else if (tip == 4) {
    if (idk) {
      mp.events.call("testpractic");
    } else {
      dmv.destroy();
    }
  }
}

function start_timp() {
  let minutes = 15;
  let seconds = 0;

  interval = setInterval(() => {
    if (minutes === 0 && seconds === 0) {
      console.log("OVER");
      clearInterval(interval);
      force_stop("stop");
    } else {
      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");
      dmv.execute(`$(".timp_box").text("${formattedMinutes}:${formattedSeconds}");`);
    }
  }, 1000);
}

function quest_nextone() {
  dmv.execute(`
    $("#acomodare_header").html('Intrebari ${datas.questindex}/${datas.lastindex}');
    let tbl = Intreb[datas.questcurtip][datas.questindex];

    if (tbl.tip) {
      $("#curpage_acomodare").attr("class", "cont_page tip" + tbl.tip);
    }

    let htmlContent = '<h1>' + tbl.titlu + '</h1><div class="cont-intrebari"><div id="intreb_acomodare" class="left_side23"></div>';

    if (tbl.tip === 2) {
      htmlContent += '<img src="https://media.discordapp.net/attachments/1077518339632549928/1233593995993682021/Fara_titlu.jpg?ex=662da96f&is=662c57ef&hm=fed33811bcccc92d54fd89cfc6010abdd517f7d0807606941e06890524311ab4&=&format=webp" alt="Image related to the question"></div>';
    } else {
      htmlContent += '</div>';
    }

    $("#curpage_acomodare").html(htmlContent);

    for (var x in tbl.options) {
      $("#intreb_acomodare").append('<div class="intrebare_acom" data-acomodarecorrct=' + tbl.options[x].correct + '><div class="left_side">' + x + '</div><p>' + tbl.options[x].answer + '</p></div>');
    }
  `);
}

let idk = false;

function fadala(tip) {
  if (tip === "send_answer") {
    if (!datas.questcurtip || !Intreb[datas.questcurtip]) {
      console.error('Invalid question category:', datas.questcurtip);
      return;
    }

    const question = Intreb[datas.questcurtip][datas.questindex];
    if (!question) {
      console.error('Invalid question index:', datas.questindex);
      return;
    }

    const tbl = question.options;
    if (!tbl) {
      console.error('Options not defined for current question.');
      return;
    }

    let needtrue = 0;
    let curtrue = 0;

    for (const key in tbl) {
      if (tbl[key].correct === true) {
        console.log(key, tbl[key].correct);
        needtrue++;
      }
    }

    dmv.execute(`
      $(".selected_question").each(function () {
        const selectedCorrect = $(this).data("acomodarecorrct");

        if (selectedCorrect !== true) {
          answer = false;
          return false;
        } else {
          curtrue++;
        }
      });
    `);

    console.log(curtrue, needtrue, "DAAAAAA");
    answer = (curtrue === needtrue);

    if (answer) {
      datas.questions_right.corecte++;
      if (datas.questcurtip !== "acomodare") {
        dmv.execute(`$("#intrebari_corecte").html(${datas.questions_right.corecte});`);
      }
    } else {
      datas.questions_right.gresite++;
      if (datas.questcurtip !== "acomodare") {
        dmv.execute(`$("#intrebari_gresite").html(${datas.questions_right.gresite});`);
        if (datas.questions_right.gresite === 4) {
          force_stop("stop");
        }
      }
    }

    if (datas.questcurtip !== "acomodare") {
      dmv.execute(`$("#intrebari_ramase").html(${parseInt($("#intrebari_ramase").html()) - 1});`);
    }

    answered_questions.push(datas.questindex);

    console.log(answered_questions.length, "CATEMAAFCTMOSU");
    if (remainingindex.length === 0) {
      if (answered_questions.length === datas.lastindex) {
        console.log("DONE");
        if (datas.questcurtip === "acomodare") {
          dmv.execute(`
            $(".hideelement").hide();
            $("#intrebcorcte").text(${datas.questions_right.corecte});
          `);
          if (datas.questions_right.corecte >= 1) {
            dmv.execute(`$("#cevr").text("Ai trecut 'sala', acum esti nevoit sa dai proba practica pentru a obtine permisul de conducere!");`);
            idk = true;
          } else {
            dmv.execute(`$("#cevr").text("Ne pare rau, ai picat proba teoretica!");`);
            idk = false;
          }
          dmv.execute(`$(".cont_dabaeala_pagina").fadeIn();`);
        } else {
          force_stop();
        }
        return;
      } else {
        datas.questindex++;
      }
    } else {
      console.log(remainingindex);
      datas.questindex = remainingindex[0];
      remainingindex.shift();
      console.log(remainingindex);
    }

    console.log(datas.questindex, "QUESTINDEX");
    quest_nextone();
  } else if (tip === "modify_answer") {
    dmv.execute(`$(".selected_question").removeClass("selected_question");`);
  }
}

function setupEventHandlers() {
  dmv.execute(`
    $(document).ready(function() {
      // Ensure jQuery and DOM are ready
      $(document).on("click", ".intrebare_acom", function() {
        if (!$(this).hasClass("selected_question")) {
          $(this).addClass("selected_question");
        }
      });

      $(document).keyup(function(e) {
        if (e.which == 27) {
          exit();
        }
      });
    });
  `);
}

function exit() {
  if (!datas.noescape) {
    dmv.execute(`$("html,body").fadeOut();`);
    mp.trigger("actione", JSON.stringify({ care: "exit" }));
  }
}

function force_stop(tip) {
  dmv.execute(`
    $(".hideelement").hide();
    clearInterval(interval);
    $(".cont_final_pagina").fadeIn();
  `);
  if (tip == "stop") {
    dmv.execute(`
      $("#final_dala").html('<i style="color: #a52525;" class="fa-solid fa-circle-xmark"></i><p style="color: #a52525;">Testul a luat sfarsit. Ati fost declarat RESPINS la examenul de teorie</p>');
    `);
  } else {
    dmv.execute(`
      $("#final_dala").html('<i style="color: #59B359;" class="fa-solid fa-circle-check"></i><p style="color: #59B359;">Testul a luat sfarsit. Ati fost declarat ADMIS la examenul de teorie</p>');
    `);
  }
  setTimeout(() => {
    dmv.execute(`$(".hideelement").hide();`);
    setupPAGE();
  }, 5000);
}
