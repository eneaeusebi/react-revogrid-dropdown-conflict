# Revogrid Pro - Dropdown conflict stack error

## Quick start
requirements: access to @revolist:registry=https://npm.rv-grid.com

```sh
npm install
npm run start
```

## issues
 dispatchByEvent(event, CELL_EDIT_ORIGINAL_EVENT, ...) triggers clipboard audit tracking, which tries to resolve the model via store.get("items"). If that access triggers another validation read (because cellProperties is being computed), it loops infinitely.
 The loop is from audit history tracking CELL_EDIT_ORIGINAL_EVENT. AuditHisto

for current test, it involves:
- CellValidatePlugin
- HistoryPlugin (indirectly, with Clipboard / Audit History plugin)

### consequences
RangeError: Maximum call stack size exceeded