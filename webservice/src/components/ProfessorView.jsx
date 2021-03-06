import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/Cancel';
import TemplateForm from './NewTemplateForm';
import { labPapersStyle } from './StudentView';
import LabInstancesList from './LabInstancesList';
import LabTemplatesList from './LabTemplatesList';
import { vmTypes } from '../services/ApiManager';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// next disable is to avoid to create a single file for the trantision component
// eslint-disable-next-line react/no-multi-comp
export default function ProfessorView(props) {
  const {
    deleteLabTemplate,
    templateLabs,
    start,
    instanceLabs,
    connect,
    stop,
    showStatus,
    imageList,
    createNewTemplate,
    adminGroups
  } = props;

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [version, setVersion] = useState(null);
  const [namespace, setNamespace] = useState(null);
  const [errorcode, setErrorcode] = useState(0);
  const [description, setDescription] = useState(null);
  const [type, setType] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit = () => {
    if (!adminGroups.includes(namespace)) {
      setErrorcode(1);
      return;
    }
    if (!imageList.has(image)) {
      setErrorcode(3);
      return;
    }
    if (!imageList.get(image).includes(version)) {
      setErrorcode(4);
      return;
    }

    createNewTemplate(
      namespace,
      description,
      Number(document.getElementsByName('cpu')[0].value),
      Number(document.getElementsByName('memory')[0].value),
      image,
      version,
      type || vmTypes.GUI
    );

    setErrorcode(0);
    setNamespace(null);
    setVersion(null);
    setImage(null);
    setDescription(null);
    setType(null);
    setOpen(false);
  };

  const handleAbort = () => {
    setErrorcode(0);
    setNamespace(null);
    setVersion(null);
    setImage(null);
    setDescription(null);
    setType(null);
    setOpen(false);
  };
  return (
    <>
      <div style={labPapersStyle}>
        <LabTemplatesList
          deleteLabTemplate={deleteLabTemplate}
          labs={templateLabs}
          start={start}
        />
        <LabInstancesList
          runningLabs={instanceLabs}
          connect={connect}
          stop={stop}
          showStatus={showStatus}
        />
      </div>
      <div style={labPapersStyle}>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          direction="row"
          noValidate
          autoComplete="off"
        >
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
              startIcon={<AddCircleIcon />}
              style={{ margin: '10px' }}
            >
              Create new Template
            </Button>
            <Dialog open={open} TransitionComponent={Transition} keepMounted>
              <DialogTitle id="alert-dialog-slide-title">
                Create new template
              </DialogTitle>
              <DialogContent>
                <TemplateForm
                  image={image}
                  version={version}
                  namespace={namespace}
                  setImage={setImage}
                  setVersion={setVersion}
                  setNamespace={setNamespace}
                  setDescription={setDescription}
                  setType={setType}
                  imageList={imageList}
                  adminGroups={adminGroups}
                  errorcode={errorcode}
                  description={description}
                  type={type}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAbort}
                  startIcon={<DeleteIcon />}
                >
                  Abort
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                  onClick={handleSubmit}
                  type="submit"
                  disabled={
                    !description ||
                    description === '' ||
                    !type ||
                    !image ||
                    !version ||
                    !namespace
                  }
                >
                  Create
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
