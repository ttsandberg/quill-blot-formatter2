"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quill_1 = __importDefault(require("quill"));
const deepmerge_1 = __importDefault(require("deepmerge"));
const Options_1 = __importDefault(require("./Options"));
const Image_1 = __importDefault(require("./blots/Image"));
const Video_1 = __importDefault(require("./blots/Video"));
const Toolbar_1 = __importDefault(require("./actions/toolbar/Toolbar"));
const dontMerge = (destination, source) => source;
class BlotFormatter {
    quill;
    options;
    currentSpec;
    specs;
    overlay;
    toolbar;
    sizeInfo;
    actions;
    startX = 0; // touch scroll tracking
    startY = 0;
    constructor(quill, options = {}) {
        this.quill = quill;
        this.currentSpec = null;
        this.actions = [];
        // disable Blot Formatter behaviour when editor is read only
        if (quill.options.readOnly) {
            this.options = Options_1.default;
            this.toolbar = new Toolbar_1.default(this);
            this.specs = [];
            this.overlay = document.createElement('div');
            this.sizeInfo = document.createElement('div');
            return;
        }
        // merge custom options with default
        this.options = (0, deepmerge_1.default)(Options_1.default, options, { arrayMerge: dontMerge });
        // create overlay & size info plus associated event listeners 
        [this.overlay, this.sizeInfo] = this.createOverlay();
        this.addEventListeners();
        // create overlay toolbar
        this.toolbar = new Toolbar_1.default(this);
        // define which specs to be formatted, initialise each
        this.specs = this.options.specs.map((SpecClass) => new SpecClass(this));
        this.specs.forEach(spec => spec.init());
        // disable native image resizing on firefox
        document.execCommand('enableObjectResizing', false, 'false'); // eslint-disable-line no-undef
        // set position relative on quill container for absolute positioning of overlay & proxies 
        this.quill.container.style.position = this.quill.container.style.position || 'relative';
        // register custom blots as per options
        this.registerCustomBlots();
        // register keyboard bindings as per options
        this.keyboardBindings();
    }
    show(spec) {
        // clear overlay in case show called while overlay active on other blot
        this.hide();
        this.currentSpec = spec;
        this.currentSpec.setSelection();
        this.setUserSelect('none');
        this.quill.container.appendChild(this.overlay);
        this.repositionOverlay();
        this.createActions(spec);
        this.toolbar.create();
        document.addEventListener('pointerdown', this.onDocumentPointerDown);
    }
    hide() {
        if (this.currentSpec) {
            this.currentSpec.onHide();
            this.currentSpec = null;
            this.quill.container.removeChild(this.overlay);
            document.removeEventListener('pointerdown', this.onDocumentPointerDown);
            this.overlay.style.setProperty('display', 'none');
            this.setUserSelect('');
            this.destroyActions();
            this.toolbar.destroy();
            // TEXT_CHANGE event clears resize cursor from image when form is saved while overlay still active
            this.quill.emitter.emit(this.quill.constructor.events.TEXT_CHANGE, 0, this.quill.getLength(), 'api');
        }
    }
    update() {
        this.repositionOverlay();
        this.actions.forEach(action => action.onUpdate());
    }
    createActions(spec) {
        this.actions = spec.getActions().map((action) => {
            action.onCreate();
            return action;
        });
    }
    destroyActions() {
        this.actions.forEach((action) => action.onDestroy());
        this.actions = [];
    }
    createOverlay() {
        const overlay = document.createElement('div');
        // set up overlay element
        overlay.classList.add(this.options.overlay.className);
        if (this.options.overlay.style) {
            Object.assign(overlay.style, this.options.overlay.style);
        }
        // prevent overlay being selectable
        overlay.style.userSelect = 'none';
        overlay.style.setProperty('-webkit-user-select', 'none');
        overlay.style.setProperty('-moz-user-select', 'none');
        overlay.style.setProperty('-ms-user-select', 'none');
        const sizeInfo = document.createElement('div');
        if (this.options.overlay.sizeInfoStyle) {
            Object.assign(sizeInfo.style, this.options.overlay.sizeInfoStyle);
        }
        overlay.appendChild(sizeInfo);
        return [overlay, sizeInfo];
    }
    addEventListeners() {
        // overlay event listeners
        // scroll the quill root on mouse wheel & touch move event
        this.overlay.addEventListener('wheel', this.passWheelEventThrough);
        this.overlay.addEventListener('touchstart', this.onTouchScrollStart, { passive: false });
        this.overlay.addEventListener('touchmove', this.onTouchScrollMove, { passive: false });
        // disable context menu on overlay
        this.overlay.addEventListener('contextmenu', (event) => {
            event.stopPropagation();
            event.preventDefault();
        });
        // quill root event listeners
        // scroll visible overlay if editor is scrollable
        this.repositionOverlay = this.repositionOverlay.bind(this);
        this.quill.root.addEventListener('scroll', this.repositionOverlay);
        // reposition overlay element if editor resized
        new ResizeObserver(() => {
            this.repositionOverlay();
        }).observe(this.quill.root);
        // dismiss overlay if active and click on quill root
        this.quill.root.addEventListener('click', this.onClick);
    }
    repositionOverlay() {
        if (this.currentSpec) {
            const overlayTarget = this.currentSpec.getOverlayElement();
            if (overlayTarget) {
                const containerRect = this.quill.container.getBoundingClientRect();
                const specRect = overlayTarget.getBoundingClientRect();
                Object.assign(this.overlay.style, {
                    display: 'block',
                    left: `${specRect.left - containerRect.left - 1 + this.quill.container.scrollLeft}px`,
                    top: `${specRect.top - containerRect.top + this.quill.container.scrollTop}px`,
                    width: `${specRect.width}px`,
                    height: `${specRect.height}px`,
                });
            }
        }
    }
    setUserSelect(value) {
        const props = [
            'userSelect',
            'mozUserSelect',
            'webkitUserSelect',
            'msUserSelect',
        ];
        props.forEach((prop) => {
            // set on contenteditable element and <html>
            this.quill.root.style.setProperty(prop, value);
            if (document.documentElement) {
                document.documentElement.style.setProperty(prop, value);
            }
        });
    }
    onDocumentPointerDown = (event) => {
        // if clicked outside of quill editor and not the alt/title modal or iframe proxy image, dismiss overlay 
        const target = event.target;
        if (!(this.quill.root.parentNode.contains(target) ||
            target.closest('div[data-blot-formatter-modal]') ||
            target.classList.contains('blot-formatter__proxy-image'))) {
            this.hide();
        }
    };
    onClick = () => {
        this.hide();
    };
    passWheelEventThrough = (event) => {
        // scroll the quill root element when overlay or proxy wheel scrolled
        this.quill.root.scrollLeft += event.deltaX;
        this.quill.root.scrollTop += event.deltaY;
    };
    onTouchScrollStart = (event) => {
        // Record the initial touch positions
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            this.startX = touch.clientX;
            this.startY = touch.clientY;
        }
    };
    onTouchScrollMove = (event) => {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            const deltaX = this.startX - touch.clientX;
            const deltaY = this.startY - touch.clientY;
            const root = this.quill.root;
            // Check if we can scroll further vertically and horizontally
            const atTop = root.scrollTop === 0;
            const atBottom = root.scrollTop + root.clientHeight === root.scrollHeight;
            const atLeft = root.scrollLeft === 0;
            const atRight = root.scrollLeft + root.clientWidth === root.scrollWidth;
            // Determine if we're scrolling vertically or horizontally
            const isScrollingVertically = Math.abs(deltaY) > Math.abs(deltaX);
            const isScrollingHorizontally = Math.abs(deltaX) > Math.abs(deltaY);
            let preventDefault = false;
            // If scrolling vertically
            if (isScrollingVertically) {
                if (!(atTop && deltaY < 0) && !(atBottom && deltaY > 0)) {
                    preventDefault = true; // Prevent default only if we can scroll further
                    root.scrollTop += deltaY;
                }
            }
            // If scrolling horizontally
            if (isScrollingHorizontally) {
                if (!(atLeft && deltaX < 0) && !(atRight && deltaX > 0)) {
                    preventDefault = true; // Prevent default only if we can scroll further
                    root.scrollLeft += deltaX;
                }
            }
            if (preventDefault) {
                event.preventDefault(); // Prevent default scrolling if necessary
            }
            // Update start positions for the next move event
            this.startX = touch.clientX;
            this.startY = touch.clientY;
        }
    };
    onOverlayTouchScrollMove = (event) => {
        this.onTouchScrollMove(event);
        this.repositionOverlay();
    };
    registerCustomBlots() {
        // register image bot with title attribute support
        if (this.options.image.registerImageTitleBlot) {
            quill_1.default.register(Image_1.default, true);
        }
        // register custom video blot with initial width 100% & aspect ratio from options
        if (this.options.video.registerCustomVideoBlot) {
            Video_1.default.aspectRatio = this.options.video.defaultAspectRatio;
            quill_1.default.register(Video_1.default, true);
        }
    }
    keyboardBindings() {
        // add backspace keyboard bindings
        // patch that fixes Quill bug #4364 (https://github.com/slab/quill/issues/4364)
        if (this.options.video.registerBackspaceFix) {
            if (!this.quill.keyboard.bindings.Backspace) {
                this.quill.keyboard.bindings.Backspace = [];
            }
            this.quill.keyboard.bindings.Backspace.unshift({
                key: 'Backspace',
                empty: true,
                line: {
                    domNode: {
                        tagName: "IFRAME"
                    }
                },
                handler: (range) => {
                    this.quill.deleteText(range.index - 1, 1, "user");
                }
            });
        }
        // handles moving the cursor past the image when format set
        // without this, cursor stops and stays hidden at the image location
        if (this.options.image.registerArrowRightFix) {
            if (!this.quill.keyboard.bindings.ArrowRight) {
                this.quill.keyboard.bindings.ArrowRight = [];
            }
            this.quill.keyboard.bindings.ArrowRight.unshift({
                key: 'ArrowRight',
                collapsed: true,
                empty: false,
                suffix: /^$/,
                line: {
                    domNode: {
                        tagName: "P"
                    }
                },
                handler: (range, context) => {
                    this.quill.setSelection(range.index + range.length + 1, 0, "user");
                }
            });
        }
    }
    useRelative(targetElement) {
        if (!this.options.resize.allowResizeModeChange) {
            // mode change not allowed, always take useRelativeSize value
            return this.options.resize.useRelativeSize;
        }
        else {
            // if no width set, use useRelativeSize by default else respect existing type
            const width = targetElement.getAttribute('width');
            if (!width) {
                return this.options.resize.useRelativeSize;
            }
            else {
                return width.endsWith('%');
            }
        }
    }
}
exports.default = BlotFormatter;