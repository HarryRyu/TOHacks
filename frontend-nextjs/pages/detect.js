


const Detect = () => {
    return (
        <>
            <link
                href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
                rel="stylesheet"
            />
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,maximum-scale=1.0, user-scalable=no"
            />
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "body {\n      margin: 0;\n    }\n    #stats {\n      position: relative;\n      width: 100%;\n      height: 80px;\n    }\n    #main {\n      position: relative;\n      margin: 0;\n    }\n    #canvas-wrapper,\n    #scatter-gl-container {\n      position: relative;\n    }"
                }}
            />
            <style
                type="text/css"
                dangerouslySetInnerHTML={{
                    __html:
                        ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n"
                }}
            />
            <style
                type="text/css"
                dangerouslySetInnerHTML={{
                    __html:
                        ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n"
                }}
            />
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                        <a href="/index" className="mr-5 hover:text-gray-900">
                            Home
                        </a>
                        <a href="/create" className="mr-5 hover:text-gray-900">
                            Create a Room
                        </a>
                    </nav>
                    <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        <span className="ml-3 text-xl">TOHacks 2022</span>
                    </a>
                    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                        <a href="/join">
                            <button className="inline-flex items-center bg-yellow-100 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-200 rounded text-base mt-4 md:mt-0">
                                Join a Room
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>
            </header>
            <div id="stats">
                <div style={{ cursor: "pointer", opacity: "0.9" }}>
                    <canvas
                        width={160}
                        height={96}
                        style={{ width: 140, height: 80, display: "none" }}
                    />
                    <canvas
                        width={160}
                        height={96}
                        style={{ width: 140, height: 80, display: "none" }}
                    />
                    <canvas
                        width={160}
                        height={96}
                        style={{ width: 140, height: 80, display: "none" }}
                    />
                    <canvas
                        width={160}
                        height={96}
                        style={{ width: 140, height: 80, display: "block" }}
                    />
                </div>
            </div>
            <div id="main">
                <div className="container">
                    <div
                        className="canvas-wrapper mx-auto rounded-lg"
                        style={{ width: 640, height: 480 }}
                    >
                        <div className="vsc-controller vsc-nosource" />
                        <canvas className="rounded-lg" id="output" width={640} height={480} />
                        <video
                            id="video"
                            playsInline=""
                            style={{
                                WebkitTransform: "scaleX(-1)",
                                transform: "scaleX(-1)",
                                visibility: "hidden",
                                width: "auto",
                                height: "auto"
                            }}
                            width={640}
                            height={480}
                        ></video>
                    </div>
                    <div
                        id="scatter-gl-container"
                        style={{ width: 640, height: 480, display: "none" }}
                    >
                        <svg
                            style={{
                                display: "none",
                                height: "100%",
                                width: "100%",
                                position: "absolute"
                            }}
                        >
                            <rect
                                style={{
                                    stroke: "rgb(170, 170, 170)",
                                    strokeDasharray: "10, 5",
                                    strokeWidth: 2,
                                    fill: "rgb(221, 221, 221)",
                                    fillOpacity: "0.2"
                                }}
                            />
                        </svg>
                        <canvas
                            tabIndex={0}
                            width={1280}
                            height={960}
                            style={{ width: 640, height: 480 }}
                        />
                    </div>
                </div>
            </div>
            <div className="dg ac">
                <div className="dg main a" style={{ width: 300 }} id="gui">
                    <div
                        style={{
                            width: 6,
                            marginLeft: "-3px",
                            height: 0,
                            cursor: "ew-resize",
                            position: "absolute"
                        }}
                    />
                    <ul style={{ height: "auto" }} className="closed">
                        <li className="folder">
                            <div className="dg">
                                <ul className="closed">
                                    <li className="title">Camera</li>
                                    <li className="cr number">
                                        <div>
                                            <span className="property-name">targetFPS</span>
                                            <div className="c">
                                                <input type="text" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cr string">
                                        <div>
                                            <span className="property-name">sizeOption</span>
                                            <div className="c">
                                                <select>
                                                    <option value="640 X 480">640 X 480</option>
                                                    <option value="640 X 360">640 X 360</option>
                                                    <option value="360 X 270">360 X 270</option>
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="folder">
                            <div className="dg">
                                <ul>
                                    <li className="title">Model</li>
                                    <li className="cr string">
                                        <div>
                                            <span className="property-name">model</span>
                                            <div className="c">
                                                <select>
                                                    <option value="MoveNet">MoveNet</option>
                                                    <option value="BlazePose">BlazePose</option>
                                                    <option value="PoseNet">PoseNet</option>
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cr string">
                                        <div>
                                            <span className="property-name">type</span>
                                            <div className="c">
                                                <select>
                                                    <option value="lightning">lightning</option>
                                                    <option value="thunder">thunder</option>
                                                    <option value="multipose">multipose</option>
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cr string">
                                        <div>
                                            <span className="property-name">customModel</span>
                                            <div className="c">
                                                <input type="text" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cr number has-slider">
                                        <div>
                                            <span className="property-name">scoreThreshold</span>
                                            <div className="c">
                                                <div>
                                                    <input type="text" />
                                                </div>
                                                <div className="slider">
                                                    <div className="slider-fg" style={{ width: "30%" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cr boolean">
                                        <div>
                                            <span className="property-name">enableTracking</span>
                                            <div className="c">
                                                <input type="checkbox" />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="folder">
                            <div className="dg">
                                <ul>
                                    <li className="title">Backend</li>
                                    <li className="cr string">
                                        <div>
                                            <span className="property-name">runtime-backend</span>
                                            <div className="c">
                                                <select>
                                                    <option value="tfjs-webgl">tfjs-webgl</option>
                                                    <option value="tfjs-wasm">tfjs-wasm</option>
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cr number">
                                        <div>
                                            <span className="property-name">webgl version</span>
                                            <div className="c">
                                                <select>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cr boolean">
                                        <div>
                                            <span className="property-name">cpu forward</span>
                                            <div className="c">
                                                <input type="checkbox" defaultChecked="checked" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cr boolean">
                                        <div>
                                            <span className="property-name">webgl pack</span>
                                            <div className="c">
                                                <input type="checkbox" defaultChecked="checked" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cr boolean">
                                        <div>
                                            <span className="property-name">enforce float16</span>
                                            <div className="c">
                                                <input type="checkbox" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cr boolean">
                                        <div>
                                            <span className="property-name">enable float32</span>
                                            <div className="c">
                                                <input type="checkbox" defaultChecked="checked" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cr number">
                                        <div>
                                            <span className="property-name">GL flush wait time(ms)</span>
                                            <div className="c">
                                                <select>
                                                    <option value={0}>0</option>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={-1}>-1</option>
                                                    <option value="0.25">0.25</option>
                                                    <option value="0.5">0.5</option>
                                                    <option value="0.75">0.75</option>
                                                    <option value="1.25">1.25</option>
                                                    <option value="1.5">1.5</option>
                                                    <option value="1.75">1.75</option>
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <div className="close-button close-bottom" style={{ width: 300 }}>
                        Open Controls
                    </div>

                </div>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.min.js"></script>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js"></script>

                <script src="https://storage.googleapis.com/tfjs-models/demos/pose-detection/src.a2b27638.js"></script>
            </div>
        </>

    )
}


export default Detect
