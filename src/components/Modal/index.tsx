import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({stationTime}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
                    <table>
                        <tr>
                            <th>LN</th>
                            <th>CAR</th>
                            <th>DEST</th>
                            <th>MIN</th>
                        </tr>
                        <tr>
                            {stationTime.map((stationLine) : any => (
                                <td key={stationLine.realTrainId}>{stationLine.Line}</td>
                            ))}
                        </tr>
                        <tr>
                            {stationTime.map((stationCar) : any => (
                                <td key={stationCar.realTrainId}>{stationCar.Car}</td>
                            ))}
                        </tr>
                        <tr>
                            {stationTime.map((stationDestination) : any => (
                                <td key={stationDestination.realTrainId}>{stationDestination.DestinationName}</td>
                            ))}

                        </tr>
                        <tr>
                            {stationTime.map((stationMin) : any=> (
                                <td key={stationMin.realTrainId}>{stationMin.Min}</td>
                            ))}
                        </tr>
                    </table>
      </Modal>
    </div>
  );
}