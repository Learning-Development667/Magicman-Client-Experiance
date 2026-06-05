/* ==========================================================================
   Magicman Client Experience (MM-CE)
   main.js - MARV control, stage navigation, progress tracking
   UK English throughout. No em dashes anywhere in this project.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     Journey definition
     The six stages of the Magicman service journey. Stage HTML files live in
     the stages/ folder and are loaded into the stage host on demand.
     ------------------------------------------------------------------------ */
  var STAGES = [
    { id: 's1', label: 'Claim',       file: 'stages/MM-CE-S1-claim.html' },
    { id: 's2', label: 'Assessment',  file: 'stages/MM-CE-S2-assessment.html' },
    { id: 's3', label: 'Dispatch',    file: 'stages/MM-CE-S3-dispatch.html' },
    { id: 's4', label: 'Repair',      file: 'stages/MM-CE-S4-repair.html' },
    { id: 's5', label: 'Quality',     file: 'stages/MM-CE-S5-quality.html' },
    { id: 's6', label: 'Outcome',     file: 'stages/MM-CE-S6-outcome.html' }
  ];

  /* Current journey position. Starts at 0 (intro / first stage).
     Progression events are only ever fired by explicit user action,
     never on load. */
  var currentIndex = 0;

  /* ------------------------------------------------------------------------
     MARV - the guide character
     setMarv() is the single established pattern for all MARV state changes.
        emotion: string matching a sprite filename without extension,
                 e.g. 'marvexcited' loads assets/marv/marvexcited.png
        text:    string for the speech bubble
        style:   'default' (navy) | 'correct-reaction' (green) |
                 'wrong-reaction' (red)
     ------------------------------------------------------------------------ */
  function setMarv(emotion, text, style) {
    var marvImg = document.getElementById('marv-sprite');
    var marvBubble = document.getElementById('marv-bubble');
    if (!marvImg || !marvBubble) {
      return;
    }
    marvImg.src = 'assets/marv/' + emotion + '.png';
    marvImg.alt = 'MARV looking ' + emotion;
    marvBubble.textContent = text;
    marvBubble.className = 'marv-bubble ' + (style || 'default');
  }

  /* ------------------------------------------------------------------------
     Progress indicator
     Renders one step per stage and reflects completed / active / upcoming.
     ------------------------------------------------------------------------ */
  function renderProgress() {
    var list = document.getElementById('progress-steps');
    if (!list) {
      return;
    }
    list.innerHTML = '';
    STAGES.forEach(function (stage, index) {
      var li = document.createElement('li');
      li.className = 'progress-step';
      if (index < currentIndex) {
        li.classList.add('is-complete');
      } else if (index === currentIndex) {
        li.classList.add('is-active');
        li.setAttribute('aria-current', 'step');
      }

      var dot = document.createElement('span');
      dot.className = 'progress-step__dot';

      var label = document.createElement('span');
      label.className = 'progress-step__label';
      label.textContent = (index + 1) + '. ' + stage.label;

      li.appendChild(dot);
      li.appendChild(label);
      list.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------------
     Stage navigation
     loadStage() fetches a stage HTML fragment and injects it into the host.
     Works over http(s). When opened directly from the file system some
     browsers block fetch of local files; in that case the host shows a
     friendly message. Final delivery is a single deployable package, so
     assembly strategy may consolidate stages into index.html if required.
     ------------------------------------------------------------------------ */
  function loadStage(index) {
    if (index < 0 || index >= STAGES.length) {
      return;
    }
    currentIndex = index;
    renderProgress();

    var host = document.getElementById('stage-host');
    if (!host) {
      return;
    }

    var stage = STAGES[index];

    fetch(stage.file)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Stage not found: ' + stage.file);
        }
        return response.text();
      })
      .then(function (html) {
        host.innerHTML = html;
        host.scrollIntoView({ behavior: 'smooth', block: 'start' });
      })
      .catch(function (error) {
        host.innerHTML =
          '<div class="card text-centre">' +
          '<h3>Stage coming soon</h3>' +
          '<p>This stage has not been built yet, or the experience is being ' +
          'viewed directly from the file system.</p>' +
          '</div>';
        if (window.console && console.info) {
          console.info('[MM-CE] ' + error.message);
        }
      });
  }

  function goNext() {
    if (currentIndex < STAGES.length - 1) {
      loadStage(currentIndex + 1);
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      loadStage(currentIndex - 1);
    }
  }

  /* ------------------------------------------------------------------------
     Boot
     Sets the journey up on first load. Does NOT fire any progression or
     completion event - it simply renders the starting position.
     ------------------------------------------------------------------------ */
  function init() {
    renderProgress();
    setMarv(
      'marvexcited',
      'Hi, I am MARV. Let me walk you through the Magicman repair journey.',
      'default'
    );
    // The first stage is loaded only once the user chooses to begin.
    var startBtn = document.getElementById('start-journey');
    if (startBtn) {
      startBtn.addEventListener('click', function () {
        loadStage(0);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ------------------------------------------------------------------------
     Public API
     Exposed on window so stage files and mini-games can drive MARV and
     navigation through one consistent interface.
     ------------------------------------------------------------------------ */
  window.MMCE = {
    setMarv: setMarv,
    loadStage: loadStage,
    next: goNext,
    prev: goPrev,
    stages: STAGES,
    getCurrentIndex: function () {
      return currentIndex;
    }
  };
})();
