type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
import * as toolkitRaw from '@reduxjs/toolkit';
const toolkit = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;

export default toolkit;
