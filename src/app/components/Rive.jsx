"use client";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export default function Rive(props) {
  const STATE_MACHINE_NAME = "State Machine 1";
  const INPUT_NAME = "Pressed";
  const CLICK_NAME = "Clicked";

  const { rive, RiveComponent } = useRive(
    {
      src: "/rives/creaml4tt3.riv",
      stateMachines: STATE_MACHINE_NAME,
      autoplay: true,
    },
    { fitCanvasToArtboardHeight: false, useOffscreenRenderer: true }
  );

  const onClickInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  );

  const onOpenInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    CLICK_NAME
  );

  return (
    <RiveComponent
      className={props.className}
      style={{ height: "100%", width: "100%" }}
      onClick={() => onClickInput.fire()}
    />
  );
}
