import { EVENT_ARGS_FRAME, EVENT_ARGS_FRAME_INPUT, FrameEventName, RECT } from '../types';
import { UIControl } from "./Control";
import { MainFrame } from '../mainframe';

export class InfoBoxCtrl extends UIControl {
    public getTypeName(): string {
        return "InfoBoxCtrl";
    }

    public onBindElement(htmlContainer: HTMLElement, frame: MainFrame, args: EVENT_ARGS_FRAME) {
        var ctrl = this;

        $(htmlContainer).hide();

        $('.btnCloseInfoPanel', htmlContainer).click(function () {
            $(htmlContainer).hide();
        });

        var htmlInfoBox = $('.infoBox', htmlContainer);

        this.on(FrameEventName.FRAME_CLEAR_ALL_FLAGS, function (args) {
            ctrl.hide();
        });

        //show details of selected node
        //DANGER!!!
        frame.off(FrameEventName.NETWORK_CLICK);
        frame.on(FrameEventName.NETWORK_CLICK,
            function (args: EVENT_ARGS_FRAME_INPUT) {
                if (!ctrl._disabled) {
                    var nodeIds = args.nodes;
                    if (nodeIds.length > 0) {
                        frame.fire(FrameEventName.SHOW_INFO, {
                            nodes: nodeIds,
                            htmlInfoBox: htmlInfoBox
                        });
                        $(htmlContainer).show();
                    }
                }
            });
    }
}
