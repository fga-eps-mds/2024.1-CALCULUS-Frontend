'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Typography,
} from '@mui/material';

export default function Popup({ title, children, openPopup, setPopup }: any) {
  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{title}</Typography>
          <Button color="error" onClick={() => setPopup(false)}>
            X
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
