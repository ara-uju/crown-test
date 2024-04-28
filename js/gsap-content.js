gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });

  ScrollTrigger.refresh();

  const videoList = document.querySelectorAll("video");

  videoList.forEach((videoEl, i) => {
    videoEl.addEventListener("loadeddata", function () {
      videoEl.play();
      let pauseWait = setTimeout(() => {
        videoEl.pause();
        clearTimeout(pauseWait);
      }, 1500);
      console.log("loaded video #" + i + " of /" + videoList.length);
    });
  });

  // DESKTOP
  let folder = document.querySelector(".folder-container");
  let windowHeight = window.innerHeight;

  folder.addEventListener("click", () => {
    folder.classList.add("selected");
    document.querySelector("#desktop").classList.add("ootd");

    let selectTimeout = setTimeout(() => {
      window.scroll({
        top: windowHeight,
        behavior: "smooth",
      });

      clearTimeout(selectTimeout);
    }, 1800);
  });

  // INTRO TYPE
  let ootd = document.querySelector(".ootd");
  let ootdFontList = ["dm-serif", "pixelify-sans", "rubik-glitch", "jost-nine", "oswald", "dancing-script", "climate-crisis"];
  let currentClass = null;

  // OOTD
  ScrollTrigger.create({
    trigger: ".ootd-section",
    start: "top 5%",
    end: "+=300%",
    toggleActions: "play reverse play reverse",
    anticipatePin: 1,
    scrub: 1,
    pin: true,
    onEnter: () => {
      if (docReady) {
        document.querySelector("#desktop").classList.add("hide");
        ScrollTrigger.refresh();
      }
    },
    onUpdate: (self) => {
      let index = Math.floor(self.progress * (ootdFontList.length - 1));

      if (currentClass) {
        ootd.classList.remove(currentClass);
      }
      ootd.classList.add(ootdFontList[index]);

      currentClass = ootdFontList[index];
    }
  });

  // THIS MY
  gsap.timeline({
    scrollTrigger: {
      trigger: ".this-my-section",
      start: "top top",
      //end: "+=250%",
      toggleActions: "play reverse play reverse",
      scrub: 1,
      pin: true,
      //pinSpacing: false
    }
  })
    .from(".this-my-section", {
      opacity: 0,
      duration: 0
    })
    .from(".this-my-section .container > h2 span", { // show first frame
      display: "none",
      stagger: 0.5
    }, "<")
    .to(".this-my-section .container > h2 span", { // hide
      display: "none"
    })
    .fromTo(".this-my-section .this-my-container", { // show second frame
      display: "none"
    }, {
      display: "flex",
      stagger: 1
    })
    .to(".this-my-section .this-my-container", { // hide
      display: "none"
    })
    .fromTo(".this-my-section .this-my-container-two", { // show second frame
      display: "none"
    }, {
      display: "flex",
      stagger: 1
    })
    .to(".this-my-section .this-my-container-two", { // hide
      display: "none"
    });

  // THIS MY FASHION
  gsap.timeline({
    scrollTrigger: {
      trigger: ".this-my-fashion-section",
      start: "top top",
      end: "+=500%",
      toggleActions: "play reverse play reverse",
      scrub: 1,
      pin: ".this-my-fashion-section .window-container",
      pinSpacing: true,
      //pinSpacing: false,
      markers: false
    }
  })
    .from(".panel-container .window-container", {
      opacity: 0,
      duration: .1
    })
    .to(".this-my-section .this-my-container-two", {
      delay: .25,
      opacity: 0,
      duration: 0.01
    }, "<")
    .from(".this-my-fashion-section h2", { // show first frame
      display: "none",
      stagger: 0.5,
      onComplete: () => {
        document.querySelector(".this-my-fashion-section h2").classList.add("regular");
        document.querySelector(".this-my-fashion-section").classList.add("white-bg");
      }
    })
    .to(".this-my-fashion-section h2", { // hide
      display: "none",
      onComplete: () => {
        document.querySelector(".this-my-fashion-section h2").classList.remove("regular");
      }
    })
    .fromTo(".this-my-fashion-section p", { // show second frame
      display: "none",
      scale: 3
    }, {
      display: "flex",
      scale: 1,
      stagger: 1
    })
    .fromTo(".this-my-fashion-section .this-my-fashion-container>div", { // show second frame
      display: "none"
    }, {
      display: "flex"
    })
    .from(".this-my-fashion-section .this-my-fashion-container>div.left", {
      xPercent: -50,
      ease: "power2.out"
    }, "<")
    .from(".this-my-fashion-section .this-my-fashion-container>div.right", {
      xPercent: 100,
      ease: "power2.out"
    }, "<")
    .to(".panel-container .window-container", {
      scale: 1,
      duration: .6,
      ease: "power2.out"
    }, "<")
    .to(".panel-container .window-container", {
      delay: 1,
      scale: 0,
      xPercent: 80,
      yPercent: 200,
      duration: .8,
      ease: "power3.out",
      onComplete: () => {
        document.querySelector(".this-my-fashion-section").classList.remove("white-bg");
      }
    })
    .to(".this-my-fashion-section .this-my-fashion-container>div", { // hide
      display: "none"
    });


  // SHUT UP - NO - MORE - QUESTIONS
  gsap.timeline({
    scrollTrigger: {
      trigger: ".single-word-section",
      start: "top top",
      end: "+=500%",
      pin: true,
      toggleActions: "play resume play reverse",
      scrub: true,
      markers: false
    }
  })
    .from(".horizontal-progress-bar .progress-bar-inner", {
      width: "0%"
    })
    .from(".shut-up", {
      opacity: 0,
      x: "25%",
      duration: .1,
      ease: "power3.out"
    }, "<")
    .fromTo(".shut-up span", {
      opacity: 0,
      x: "25%"
    }, {
      opacity: 1,
      x: "0%",
      stagger: .5,
      ease: "power1.out"
    }, "<")
    .to(".shut-up", { //shut up
      opacity: 0,
      x: "-25%",
      ease: "power3.out"
    })
    .from(".no", {
      opacity: 0,
      x: "25%",
      ease: "power3.out"
    }, "<")
    .to(".no", { //no
      opacity: 0,
      x: "-25%",
      ease: "power3.out"
    })
    .from(".more", {
      opacity: 0,
      x: "25%",
      ease: "power3.out"
    }, "<")
    .to(".more", { //more
      opacity: 0,
      x: "-25%",
      ease: "power3.out"
    })
    .from(".questions", {
      opacity: 0,
      x: "25%",
      duration: .1,
      ease: "power3.out"
    }, "<")
    .fromTo(".questions span", {
      opacity: 0,
      x: "25%"
    }, {
      opacity: 1,
      x: "0%",
      stagger: .5,
      ease: "power1.out"
    }, "<")
    .to(".questions", { //questions
      opacity: 0,
      x: "-25%",
      ease: "power3.out",
      onComplete: () => {
        gsap.fromTo(".window-container.handong-exe",
          {
            height: "0%",
            opacity: 0
          },
          {
            height: "auto",
            opacity: 1,
            duration: .15,
            ease: "power2.out",
            onStart: () => {
              document.querySelector(".bleh").play();
            },
            onComplete: () => {
              let timeout = setTimeout(() => {
                gsap.to(".window-container.handong-exe",
                  {
                    height: "0%",
                    opacity: 0,
                    duration: .25,
                    ease: "power2.out"
                  });
                clearTimeout(timeout);
              }, 1000);
            }
          })
      }
    });

  // indicates the index of the first video (of a group of 3) that is in view and therefore should be playing
  // following two videos in group have indexes [videoScrollIndex+1] and [videoScrollIndex+2]
  let videoScrollIndex = 0;

  // controll var, ensures blocks of code don't run unnecessarily
  let shiftVideos = false;

  // check which set of videos should be playing
  function videoPlayChecker() {
    document.querySelectorAll(".bg-img-container video").forEach((vid, i) => {
      if (i >= videoScrollIndex && i <= (videoScrollIndex + 2)) {
        vid.play();
      } else {
        vid.pause();
      }
      shiftVideos = !shiftVideos;
    });
  }

  function pauseAll() {
    document.querySelectorAll(".bg-img-container video").forEach((vid) => {
      vid.pause();
      shiftVideos = !shiftVideos;
    });
  }

  let scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".single-word-section",
      start: "top top",
      end: "+=700%",
      toggleActions: "play resume play reverse",
      scrub: true,
      onEnter: () => {
        shiftVideos = true;
      },
      onUpdate: () => {

        if (scrollTimeline.progress() <= 0.18 && shiftVideos) {
          videoScrollIndex = 0;
          videoPlayChecker();
        } else if (scrollTimeline.progress() <= 0.28 && scrollTimeline.progress() > 0.18 && !shiftVideos) {
          videoScrollIndex = 1;
          videoPlayChecker();
        } else if (scrollTimeline.progress() <= 0.42 && scrollTimeline.progress() > 0.28 && shiftVideos) {
          videoScrollIndex = 2;
          videoPlayChecker();
        } else if (scrollTimeline.progress() <= 0.56 && scrollTimeline.progress() > 0.42 && !shiftVideos) {
          videoScrollIndex = 3;
          videoPlayChecker();
        } else if (scrollTimeline.progress() > 0.56 && scrollTimeline.progress() < 0.7 && shiftVideos) {
          videoScrollIndex = 4;
          videoPlayChecker();
        } else if (scrollTimeline.progress() >= 0.7 && !shiftVideos) {
          pauseAll();
        }

        console.log("playing videos " + videoScrollIndex + " - " + (videoScrollIndex + 2));
      }
    }
  })
    .fromTo(".bg-img-container", {
      xPercent: 100
    }, {
      xPercent: 0,
      stagger: .5,
      duration: 1
    }, "<")
    .fromTo(".bg-img-container video, .bg-img-container img", {
      xPercent: -150
    },
      {
        xPercent: 0,
        //stagger: .25,
      }, "<");

  // VERTICAL SCROLLER
  // Content enter - stripes - popup - bg video
  let bgVideo = document.querySelector("video.ootd-background");
  gsap.timeline({
    scrollTrigger: {
      trigger: ".vertical-scroller-section",
      start: "top top",
      end: "bottom top",
      pin: ".vertical-scroller-section .container-fixed",
      pinSpacing: true,
      toggleActions: "play resume play reverse",
      scrub: false,
      onEnter: () => {
        bgVideo.play();
        bgVideo.loop = true;
      },
      onEnterBack: () => {
        bgVideo.play();
        bgVideo.loop = true;
      },
      onLeave: () => {
        //bgVideo.pause();
        bgVideo.loop = false;
      },
      onLeaveBack: () => {
        //bgVideo.pause();
        bgVideo.loop = false;
      }
    }
  })
    .from(".vertical-scroller-section .stripe:nth-child(1)", {
      yPercent: -100,
      opacity: 0,
      duration: .45,
      ease: "power1.out",
      onStart: () => {
        gsap.to(".window-container.handong-exe", {
          delay: 0.1,
          height: "0%",
          opacity: 0,
          duration: .25,
          ease: "power2.out"
        });
      }
    }, "+=0%")
    .from(".vertical-scroller-section .stripe:nth-child(2)", {
      yPercent: 100,
      opacity: 0,
      duration: .45,
      ease: "power1.out"
    }, "<")
    .to(".vertical-scroller-section .background-video-container", {
      opacity: 1,
      delay: .4,
      ease: "power2.out"
    });

  // popups - window containers
  let windowContainer = document.querySelectorAll(".vertical-scroller-section .window-scroll-reveal");
  windowContainer.forEach((windowEl) => {
    //let windowParent = windowEl.parentElement;
    let windowVideo = windowEl.querySelector("video");

    gsap.timeline({
      scrollTrigger: {
        trigger: windowEl,
        start: "top 80%",
        end: "+=200%",
        //pin: windowParent,
        toggleActions: "play reverse play reverse",
        scrub: false,
        onEnter: () => {
          if (windowVideo) {
            windowVideo.play();
            windowVideo.loop = true;
          }
        },
        onEnterBack: () => {
          if (windowVideo) {
            windowVideo.play();
            windowVideo.loop = true;
          }
        },
        onLeave: () => {
          if (windowVideo) {
            windowVideo.pause();
            windowVideo.loop = false;
          }
        },
        onLeaveBack: () => {
          if (windowVideo) {
            windowVideo.pause();
            windowVideo.loop = false;
          }
        }
      }
    }).fromTo(windowEl, {
      scale: 0
    }, {
      scale: 1,
      stagger: .5,
      duration: .45,
      ease: "power2.out"
    });
  });

  // ready - action
  gsap.timeline({
    scrollTrigger: {
      trigger: ".container-inner-action",
      start: "top center",
      end: "+=300%",
      pin: ".container-inner-action",
      toggleActions: "play resume play resume",
      scrub: true,
      onLeave: () => {
        document.querySelector(".clap-bg").classList.remove("show");
      },
      onLeaveBack: () => {
        gsap.to(".window-container.ready-action", {
          height: 0,
          opacity: 0,
          duration: 0
        });
        document.querySelector(".clap-bg").classList.remove("show");
      }
    }
  })
    .from(".text-ready", {
      xPercent: -100,
      opacity: 0,
      duration: .2,
      ease: "power2.inout"
    }).to(".container-fixed", {
      delay: .2,
      opacity: 0,
      duration: .4,
      ease: "power1.out"
    }, "<").to(".text-ready", {
      delay: .05,
      xPercent: 200,
      opacity: 0,
      duration: .1,
      ease: "power2.inout",
      onComplete: () => {
        gsap.fromTo(".window-container.ready-action", {
          height: "0%",
          opacity: 0
        }, {
          height: "auto",
          opacity: 1,
          duration: .2,
          ease: "power2.out",
          onStart: () => {
            document.querySelector(".window-container.ready-action video").play();
            document.querySelector(".clap-bg").classList.add("show");
          }
        });
      }
    })
    .from(".text-action", {
      xPercent: -100,
      opacity: 0,
      duration: .2,
      ease: "power2.inout"
    }, "<")
    .to(".text-action", {
      delay: .3,
      xPercent: 200,
      opacity: 0,
      duration: .15,
      ease: "power2.inout",
      onComplete: () => {
        gsap.to(".window-container.ready-action", {
          height: 0,
          opacity: 0
        });
        document.querySelector(".clap-bg").classList.remove("show");
      }
    });

  // scrolling - progress bar (scrub)
  gsap.timeline({
    scrollTrigger: {
      trigger: ".vertical-scroller-section .container",
      start: "top top",
      end: "bottom bottom",
      toggleActions: "play resume play reverse",
      scrub: true
    }
  })
    .from(".progress-bar .progress-bar-inner", {
      height: "0%"
    });


  // INFINITE WINDOW

  // copy stripe layer code
  let nStripeLayers = 8;
  if (window.innerWidth <= 767) {
    nStripeLayers = 5;
  }

  for (let i = 0; i < nStripeLayers; i++) {
    let newLayer = document.querySelector(".stripe-layer").cloneNode(true);
    newLayer.style.zIndex = 8 - i;
    document.querySelector(".stripe-content").appendChild(newLayer);
  }

  // Window.exe - do you believe in the power of the crown?
  gsap.timeline({
    scrollTrigger: {
      trigger: ".footer-section-wrapper", // previously infinite-section
      start: "top top",
      //end: "+=250%",
      pin: ".footer-section-upper",
      anticipatePin: 1,
      toggleActions: "play reverse play reverse",
      scrub: 1,
      onLeaveBack: () => {
        document.querySelector(".crown-exe video").pause();
        document.querySelector(".crown-exe video").loop = false;
      }
    }
  }).from(".crown-exe", {
    opacity: 0,
    duration: .5
  })
    .fromTo(".crown-exe", {
      scale: 0.01,
      rotate: "15deg"
    }, {
      scale: 1,
      rotate: "0deg",
      duration: 1.5
    }, "<")
    .from(".stripe-layer", {
      height: "0vh",
      scale: "initial"
    }, "<")
    .to(".stripe-layer", {
      stagger: 0.05,
      //height: "90%",
      scale: 1.5,
      //width: "100vw",
      height: "100vh",
      duration: 2
    })
    .to(".crown-exe", {
      delay: .2,
      rotate: "-5deg",
      duration: 2.5,
      scale: 2.25,
      width: "100vw",
      height: "100vh",
      opacity: 0
    }, "<")
    .fromTo(".crown-exe .absolute", {
      height: "0%",
      scale: 1
    }, {
      height: "auto",
      scale: 2.2,
      duration: 1,
      onStart: () => {
        document.querySelector(".crown-exe video").play();
        document.querySelector(".crown-exe video").loop = true;
      }
    }, .99)
    .to(".crown-exe .absolute:after", {
      opacity: 1
    }, ">");

  // Crown reveal
  gsap.timeline({
    scrollTrigger: {
      trigger: ".footer-section-wrapper",
      start: "30% top",
      end: "bottom bottom",
      pin: ".crown-video-container",
      toggleActions: "play reverse play reverse",
      scrub: 1,
      onUpdate: function (self) {
        if (self.progress <= .42) {
          document.querySelector(".crown-video-message").innerHTML = "only the crown";
        } else if (self.progress > .42 && self.progress <= .56) {
          document.querySelector(".crown-video-message").innerHTML = "can determine";
        } else {
          document.querySelector(".crown-video-message").innerHTML = "fate";
        }
      }
    }
  }).fromTo(".footer-section.crown-video-section", {
    opacity: 0
  }, {
    opacity: 1,
    duration: .5,
    onUpdate: () => {
      let randomN = Math.random(1);
      let crownS = document.querySelector(".crown-video-section");

      if (randomN > 1 && randomN < 3) {
        crownS.setAttribute('style', 'mix-blend-mode: difference');
      } else if (randomN >= 3 && randomN < 8) {
        crownS.setAttribute('style', 'mix-blend-mode: multiply');
      } else {
        crownS.setAttribute('style', 'mix-blend-mode: lighten');
      }
    }
  }, "<")
    .fromTo(".crown-video-container", {
      yPercent: 0,
      scale: 3,
      opacity: 0
    }, {
      yPercent: 18,
      scale: 2.5,
      opacity: 1,
      ease: "power3.out"
    }, "<")
    .fromTo(".crown-video-message", {
      display: "none"
    }, {
      display: "flex",
      duration: .5
    })
    .to(".crown-video-message", {
      display: "none",
      duration: 0
    })
    .to(".interface-overlay-container", {
      opacity: 0,
      duration: .5
    }, "<")
    .fromTo(".crown-video-container", {
      scale: 2.5
    }, {
      scale: .5,
      yPercent: 10,
      ease: "power3.inout",
      duration: .45,
      onComplete: () => {
        gsap.to(".footer-text-container", {
          delay: .25,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out"
        });
      }
    }, "<");

}); // Doc loaded