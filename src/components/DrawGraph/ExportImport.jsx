import React, { useState, useReducer } from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';

export default function ExportImport({ graphData, setGraph }) {
  const [copyAlertOpen, setCopyAlertOpen] = useState(false);
  const [showImport, setShowImport] = useReducer((st) => !st, true);
  const [importText, setImportText] = useState('');
  return (
    <div className='import-export'>
      <h2 className='export-name' onClick={() => setShowImport()}>
        Export
      </h2>
      {!showImport && (
        <div className='export-box'>
          <FileCopyIcon
            className='copy-icon'
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(graphData, null, '\t'));
              setCopyAlertOpen(true);
            }}
          />
          <textarea value={JSON.stringify(graphData, null, '\t')} />
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={500}
            open={copyAlertOpen}
            onClose={() => setCopyAlertOpen(false)}
            message='Copied to clipboard!'
          />
        </div>
      )}
      <h2 className='import-name' onClick={() => setShowImport()}>
        Import
      </h2>
      {showImport && (
        <div className='import-box'>
          <textarea value={importText} onChange={(e) => setImportText(e.target.value)} />
        </div>
      )}
      {showImport && (
        <div className='import-button' onClick={() => setGraph(JSON.parse(importText))}>
          Submit
        </div>
      )}
    </div>
  );
}
