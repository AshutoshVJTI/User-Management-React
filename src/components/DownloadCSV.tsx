import Papa from 'papaparse';
import {saveAs} from 'file-saver';
import {DownloadCSVProps} from '../types/@types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCloudArrowDown} from '@fortawesome/free-solid-svg-icons';

const DownloadCSV = (props: DownloadCSVProps) => {
  const {data} = props;

  const downloadCsv = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    saveAs(blob, 'users.csv');
  };

  return (
    <button
      type="button"
      className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-1 border border-gray-400 rounded shadow text-sm h-fit"
      onClick={downloadCsv}
    >
      <FontAwesomeIcon icon={faCloudArrowDown} /> Download CSV
    </button>
  );
};

export default DownloadCSV;
