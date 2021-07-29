import React, { useState, useReducer } from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function ExportImport({ graphData, setGraph }) {
  const [copyAlertOpen, setCopyAlertOpen] = useState(false);
  const [showImport, setShowImport] = useReducer((st) => !st, false);
  const [importText, setImportText] = useState('');
  return (
    <div className='import-export'>
      <div className='export-name' onClick={() => setShowImport()}>
        {showImport ? <ArrowDropDownIcon /> : <CheckCircleIcon style={{ fontSize: '1.1rem', marginLeft: '0.2rem' }} />}
        <h2>Export</h2>
      </div>
      {!showImport && (
        <div className='export-box'>
          <FileCopyIcon
            className='copy-icon'
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(graphData, null, '\t'));
              setCopyAlertOpen(true);
            }}
          />
          <textarea value={JSON.stringify(graphData, null, '\t')} readOnly />
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={1500}
            open={copyAlertOpen}
            onClose={() => setCopyAlertOpen(false)}
            message='Copied to clipboard!'
          />
        </div>
      )}
      <div
        className='import-name'
        onClick={() => setShowImport()}
        style={{ borderRadius: `${showImport ? '0' : '0 0 5px 5px'}` }}
      >
        {showImport ? <CheckCircleIcon style={{ fontSize: '1.1rem', marginLeft: '0.2rem' }} /> : <ArrowDropDownIcon />}
        <h2>Import</h2>
      </div>
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
