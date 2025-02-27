import { WindowSettingReposistory } from "$lib/repositories/window-settings.repository";
import { invoke } from "@tauri-apps/api";

const windowSettingRepository = new WindowSettingReposistory();

export async function zoomIn() {
  let windowScaleFactor =
    await windowSettingRepository.getWindowSetting("windowScaleFactor");
  windowScaleFactor = windowScaleFactor
    ? +windowScaleFactor._data.value + 0.2
    : 1.2;
  invoke("zoom_window", { scaleFactor: windowScaleFactor });
  setScaleFactorToDb(windowScaleFactor);
}

export async function zoomOut() {
  let windowScaleFactor =
    await windowSettingRepository.getWindowSetting("windowScaleFactor");
  windowScaleFactor = windowScaleFactor
    ? +windowScaleFactor._data.value - 0.2
    : 1.0;
  invoke("zoom_window", { scaleFactor: windowScaleFactor });
  setScaleFactorToDb(windowScaleFactor);
}

async function setScaleFactorToDb(windowScaleFactor) {
  await windowSettingRepository.setWindowSetting(
    "windowScaleFactor",
    windowScaleFactor,
  );
}
