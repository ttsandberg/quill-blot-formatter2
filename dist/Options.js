"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImageSpec_1 = __importDefault(require("./specs/ImageSpec"));
const IframeVideoSpec_1 = __importDefault(require("./specs/IframeVideoSpec"));
const DefaultOptions = {
    specs: [
        ImageSpec_1.default,
        IframeVideoSpec_1.default,
    ],
    overlay: {
        className: 'blot-formatter__overlay',
        style: {
            position: 'absolute',
            boxSizing: 'border-box',
            border: '1px dashed #444',
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
            maxWidth: "100%"
        },
        sizeInfoStyle: {
            position: 'absolute',
            color: 'rgba(255, 255, 255, 0.7)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '1em',
            textWrap: 'nowrap',
            fontSize: '1rem',
            opacity: 0,
            lineHeight: 1.2,
        },
    },
    align: {
        allowAligning: true,
        alignments: ['left', 'center', 'right']
    },
    resize: {
        allowResizing: true,
        allowResizeModeChange: false,
        imageOversizeProtection: false,
        handleClassName: 'blot-formatter__resize-handle',
        handleStyle: {
            position: 'absolute',
            height: '12px',
            width: '12px',
            backgroundColor: 'white',
            border: '1px solid #777',
            boxSizing: 'border-box',
            opacity: '0.80',
        },
        useRelativeSize: false,
        minimumWidthPx: 25,
    },
    delete: {
        allowKeyboardDelete: true,
    },
    toolbar: {
        icons: {
            left: `
        <svg viewbox="0 0 18 18">
          <line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"></line>
          <line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"></line>
          <line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"></line>
        </svg>
      `,
            center: `
        <svg viewbox="0 0 18 18">
          <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
          <line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"></line>
          <line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"></line>
        </svg>
      `,
            right: `
        <svg viewbox="0 0 18 18">
          <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
          <line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"></line>
          <line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"></line>
        </svg>
      `,
            attribute: `
        <svg viewBox="0 0 24 24" fill="none" class="ql-stroke">
          <path d="M10 19H12M12 19H14M12 19V5M12 5H6V6M12 5H18V6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,
            resizeMode: `
        <svg viewBox="0 0 24 24" class="ql-stroke">
          <path
            d="m 7.7056591,11.853515 q -1.515179,0 -2.4160962,-0.993056 -0.9009172,-1.0032944 -0.9009172,-2.6720388 0,-1.8223098 0.9521057,-2.8665548 0.9521057,-1.0544826 2.5696616,-1.0544826 1.5663674,0 2.426334,0.9725811 0.870204,0.972581 0.870204,2.7334647 0,1.7608836 -0.972581,2.8256044 -0.9623435,1.054482 -2.5287109,1.054482 z M 7.8489868,5.3935293 q -0.9725811,0 -1.5356544,0.7268764 -0.5630732,0.7166387 -0.5630732,1.9758752 0,1.2387612 0.5528356,1.9349241 0.5528355,0.685926 1.5049412,0.685926 0.9623434,0 1.5049413,-0.716639 0.5425978,-0.7166384 0.5425978,-1.9861126 0,-1.2387612 -0.5425978,-1.9246868 Q 8.7806171,5.3935293 7.8489868,5.3935293 Z M 17.533847,4.4926121 8.1151669,19.275845 H 6.6511764 L 16.059619,4.4926121 Z M 16.448651,19.398697 q -1.515179,0 -2.416096,-1.003294 -0.900917,-1.003294 -0.900917,-2.661801 0,-1.82231 0.962343,-2.876793 0.962344,-1.06472 2.559424,-1.06472 1.55613,0 2.426334,0.982819 0.870204,0.982819 0.870204,2.75394 0,1.750646 -0.972581,2.815366 -0.962343,1.054483 -2.528711,1.054483 z m 0.143328,-6.449748 q -0.982819,0 -1.545892,0.716638 -0.552836,0.716639 -0.552836,1.986113 0,1.218286 0.552836,1.914449 0.552835,0.685926 1.504941,0.685926 0.962343,0 1.504941,-0.716639 0.542598,-0.726876 0.542598,-1.986113 0,-1.248998 -0.542598,-1.924686 -0.53236,-0.675688 -1.46399,-0.675688 z"
            style="fill:currentColor;stroke:currentColor;stroke-width:0.3"
          />
        </svg>
      `,
            compress: `
        <svg viewBox="0 0 28 28">
            <path d="m 19.250001,9.3125004 c 0.240623,0 0.437498,0.1968749 0.437498,0.4374991 V 18.49453 l -0.136717,-0.177734 -3.718751,-4.812498 c -0.123046,-0.161329 -0.317188,-0.254297 -0.51953,-0.254297 -0.202345,0 -0.39375,0.09297 -0.519532,0.254297 l -2.269532,2.936715 -0.833984,-1.167577 c -0.123047,-0.172265 -0.319922,-0.273437 -0.533204,-0.273437 -0.213281,0 -0.410156,0.101172 -0.533202,0.276172 l -2.1875003,3.0625 -0.1230462,0.169532 v -0.0082 -8.7500002 c 0,-0.2406242 0.1968749,-0.4374991 0.4374991,-0.4374991 z M 8.7499996,8 C 7.7847663,8 7,8.7847662 7,9.7499995 V 18.5 c 0,0.965233 0.7847663,1.75 1.7499996,1.75 H 19.250001 C 20.215235,20.25 21,19.465233 21,18.5 V 9.7499995 C 21,8.7847662 20.215235,8 19.250001,8 Z M 10.9375,13.250001 a 1.3125025,1.312501 0 1 0 0,-2.625002 1.3125025,1.312501 0 1 0 0,2.625002 z" />
            <path d="m 25.298508,20 h -3.58209 C 21.286567,20 21,20.286571 21,20.716427 v 3.582131 c 0,0.429856 0.286567,0.716426 0.716418,0.716426 v 0 c 0.429851,0 0.716418,-0.28657 0.716418,-0.716426 v -2.865705 h 2.865672 c 0.429851,0 0.716418,-0.28657 0.716418,-0.716426 C 26.014926,20.286571 25.728359,20 25.298508,20 Z" />
            <path d="M 6.298508,20 H 2.716418 C 2.2865673,20 2,20.286571 2,20.716427 c 0,0.429856 0.2865673,0.716426 0.716418,0.716426 H 5.58209 v 2.865705 c 0,0.429856 0.286567,0.716426 0.716418,0.716426 v 0 c 0.429851,0 0.716418,-0.28657 0.716418,-0.716426 V 20.716427 C 7.014926,20.286571 6.728359,20 6.298508,20 Z" />
            <path d="M 6.298507,3 C 5.868656,3 5.582089,3.28657 5.582089,3.716426 V 6.582131 H 2.716417 C 2.286567,6.582131 2,6.868702 2,7.298557 2,7.728413 2.286567,8.014984 2.716417,8.014984 h 3.58209 c 0.429845,0 0.716412,-0.286571 0.716412,-0.716427 V 3.716426 C 7.014919,3.28657 6.728352,3 6.298507,3 Z" />
            <path d="m 21.716418,8.014984 h 3.582089 c 0.429851,0 0.716418,-0.286571 0.716418,-0.716427 0,-0.429855 -0.286567,-0.716426 -0.716418,-0.716426 H 22.432836 V 3.716426 C 22.432836,3.28657 22.146269,3 21.716418,3 21.286567,3 21,3.28657 21,3.716426 v 3.582131 c 0,0.429856 0.286567,0.716427 0.716418,0.716427 z" />
        </svg>
      `
        },
        mainClassName: 'blot-formatter__toolbar',
        mainStyle: {
            position: 'absolute',
            display: 'flex',
            top: '0',
            right: '0',
            left: '0',
            transform: 'translateY(-50%)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            color: '#333',
            zIndex: '1',
        },
        buttonClassName: 'blot-formatter__toolbar-button',
        buttonStyle: {
            display: 'inline-block',
            width: '27px',
            height: '26px',
            background: 'white',
            border: '1px solid #999',
            cursor: 'pointer',
            margin: '0 -1px 0 0'
        },
        svgStyle: {
            display: 'inline-block',
            width: '100%',
            height: '100%',
            background: 'white',
            verticalAlign: 'top',
        },
    },
    image: {
        allowAltTitleEdit: true,
        registerImageTitleBlot: false,
        registerArrowRightFix: true,
        altTitleModalOptions: {
            styles: {
                modalBackground: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                },
                modalContainer: {
                    backgroundColor: '#f2f2f2',
                    padding: '5px 10px 10px 10px',
                    borderRadius: '5px',
                    position: 'relative',
                    width: '90%',
                    maxWidth: '500px'
                },
                label: {
                    display: 'block',
                    color: 'black',
                    margin: '10px 0 5px 0',
                    fontSize: '0.9em'
                },
                textarea: {
                    backgroundColor: 'white',
                    display: 'block',
                    resize: 'none',
                    width: '100%',
                    padding: '5px'
                },
                submitButton: {
                    display: 'block',
                    marginLeft: 'auto',
                    marginTop: '5px',
                    cursor: 'pointer',
                    border: 0,
                    padding: 0,
                    width: '2.5rem',
                    height: '2.5rem',
                    fill: 'green'
                },
                cancelButton: {
                    display: 'flex',
                    width: '2rem',
                    height: '2rem',
                    position: 'absolute',
                    top: '-0.7rem',
                    right: '-0.7rem',
                    background: 'white',
                    border: '1px solid gray',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    alignItems: 'center',
                    fill: 'red'
                },
            },
            icons: {
                submitButton: `
        <svg viewBox="0 0 24 24">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"></path>
        </svg>`,
                cancelButton: `
        <svg viewBox="0 0 384 512">   
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>`,
            },
            labels: {
                alt: 'Alt Text',
                title: 'Image Title'
            }
        },
        allowCompressor: false,
        compressorOptions: {
            jpegQuality: 0.8,
            styles: {
                modalBackground: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                },
                modalContainer: {
                    backgroundColor: '#000000c7',
                    padding: '15px',
                    borderRadius: '8px',
                    position: 'relative',
                    maxWidth: 'min(90%, 400px)',
                    border: '3px solid black',
                    color: 'lightgray',
                    textAlign: 'justify',
                    userSelect: 'none',
                },
                buttonContainer: {
                    gridTemplateColumns: 'auto 1fr auto',
                    display: 'grid',
                    gap: '1em',
                    justifyItems: 'center',
                    borderTop: '1px solid lightgray',
                    paddingTop: '12px'
                },
                buttons: {
                    width: '2rem',
                    height: '2rem',
                    padding: 0,
                    backgroundColor: 'transparent',
                    border: 0,
                    cursor: 'pointer'
                }
            },
            text: {
                prompt: `<h5>Compress image to its resized width?</h5>`,
                moreInfo: `
              <p style="font-size: smaller; line-height: 1.2;">You can reduce the file size and save disk space by compressing pictures. The compression reduces both
              the file size and picture dimensions based on the width setting.</p>
              <p style="font-size: smaller;"><strong>NOTE:</strong> This process cannot be undone.</p>
          `,
                reducedLabel: 'Reduced',
                nothingToDo: 'Image already optimised.'
            },
            icons: {
                cancel: `
              <svg viewBox="0 0 24 24" fill="#ea1414">
                  <path d="M 3.4285714,0 C 1.5375,0 0,1.5375 0,3.4285714 V 20.571429 C 0,22.4625 1.5375,24 3.4285714,24 H 20.571429 C 22.4625,24 24,22.4625 24,20.571429 V 3.4285714 C 24,1.5375 22.4625,0 20.571429,0 Z m 4.2321429,7.6607143 c 0.5035714,-0.5035714 1.3178571,-0.5035714 1.8160714,0 L 11.994643,10.178571 14.5125,7.6607143 c 0.503571,-0.5035714 1.317857,-0.5035714 1.816071,0 0.498215,0.5035714 0.503572,1.3178571 0,1.8160714 l -2.517857,2.5178573 2.517857,2.517857 c 0.503572,0.503571 0.503572,1.317857 0,1.816071 -0.503571,0.498215 -1.317857,0.503572 -1.816071,0 l -2.517857,-2.517857 -2.5178573,2.517857 c -0.5035714,0.503572 -1.3178571,0.503572 -1.8160714,0 C 7.1625,15.825 7.1571429,15.010714 7.6607143,14.5125 L 10.178571,11.994643 7.6607143,9.4767857 c -0.5035714,-0.5035714 -0.5035714,-1.3178571 0,-1.8160714 z" />
              </svg>`,
                moreInfo: `
              <svg viewBox="0 0 512 512" fill="royalblue">
                  <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
              </svg>`,
                continue: `
              <svg viewBox="0 0 24 24" fill="green">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M 12,24 C 6.34314,24 3.514716,24 1.757364,22.2426 0,20.48532 0,17.6568 0,12 0,6.34314 0,3.514716 1.757364,1.757364 3.514716,0 6.34314,0 12,0 17.6568,0 20.48532,0 22.2426,1.757364 24,3.514716 24,6.34314 24,12 24,17.6568 24,20.48532 22.2426,22.2426 20.48532,24 17.6568,24 12,24 Z M 16.83636,8.363604 c 0.35148,0.351468 0.35148,0.921324 0,1.272756 l -6,6 c -0.35148,0.35148 -0.92124,0.35148 -1.272756,0 l -2.4,-2.4 c -0.351468,-0.35148 -0.351468,-0.92124 0,-1.27272 0.351468,-0.35148 0.921324,-0.35148 1.272792,0 L 10.2,13.72716 15.56364,8.363604 c 0.35148,-0.351468 0.92124,-0.351468 1.27272,0 z" />
              </svg>`
            }
        }
    },
    video: {
        selector: 'iframe.ql-video',
        registerCustomVideoBlot: false,
        registerBackspaceFix: true,
        defaultAspectRatio: '16/9 auto',
        proxyStyle: {}
    }
};
exports.default = DefaultOptions;
