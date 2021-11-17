import React, { useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ReactMarkdown from 'react-markdown';
import Button from '@material-ui/core/Button';
import commonStyle from '@styleModules/common.module.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { dingPreviewFile, dingPreviewImage } from '@src/dingtalkAPI';
import { Dingtalk } from '@src/constants';
import { getDingFilePermission } from '@src/api';

type Props = {
  files: DingFile | string | DingFile[];
  onDelete?: (fileId: string) => void;
};
export default function FileList({ files, onDelete }: Props): JSX.Element {
  const handlePreviewFile = useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const dataset = event.currentTarget.dataset;

      const file = {
        spaceId: dataset.spaceId || '',
        fileId: dataset.fileId || '',
        fileName: dataset.fileName || '',
        fileSize: dataset.fileSize ? parseInt(dataset.fileSize) : 0,
        fileType: dataset.fileType || ''
      };

      if (!file.fileId) {
        return;
      }

      const permissionRes = await getDingFilePermission(
        'download',
        file.fileId
      );
      if (permissionRes.code !== 200 || !permissionRes.data.resoult) {
        return;
      }
      dingPreviewFile(Dingtalk.CORP_ID, file);
    },
    []
  );
  const handleDeleteFile = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const dataset = event.currentTarget.dataset;
      if (!dataset.fileId || typeof onDelete !== 'function') {
        return;
      }

      onDelete(dataset.fileId);
    },
    [onDelete]
  );
  if (files instanceof Array) {
    return (
      <Box padding={1.5}>
        {files.map(file => {
          return (
            <Grid wrap="nowrap" alignItems="center" key={file.fileId} container>
              <Grid xs={1} item>
                <AttachFileIcon fontSize="small" />
              </Grid>
              <Grid
                xs={9}
                data-space-id={file.spaceId}
                data-file-id={file.fileId}
                data-file-name={file.fileName}
                data-file-size={file.fileSize}
                data-file-type={file.fileType}
                onClick={handlePreviewFile}
                item
              >
                <Box paddingY={1.5}>
                  <ReactMarkdown
                    className={`${commonStyle.preWrap} ${commonStyle.markdown} ${commonStyle.breakWord}`}
                  >
                    {file.fileName}
                  </ReactMarkdown>
                </Box>
              </Grid>
              {onDelete && (
                <Grid xs={2} item>
                  <Button data-file-id={file.fileId} onClick={handleDeleteFile}>
                    <DeleteForeverIcon fontSize="small" />
                  </Button>
                </Grid>
              )}
            </Grid>
          );
        })}
      </Box>
    );
  }

  if (files instanceof Object) {
    return (
      <Box padding={1.5}>
        <Grid wrap="nowrap" alignItems="center" key={files.fileId} container>
          <Grid xs={1} item>
            <AttachFileIcon fontSize="small" />
          </Grid>
          <Grid
            xs={9}
            data-space-id={files.spaceId}
            data-file-id={files.fileId}
            data-file-name={files.fileName}
            data-file-size={files.fileSize}
            data-file-type={files.fileType}
            onClick={handlePreviewFile}
            item
          >
            <Box paddingY={1.5}>
              <ReactMarkdown
                className={`${commonStyle.preWrap} ${commonStyle.markdown} ${commonStyle.breakWord}`}
              >
                {files.fileName}
              </ReactMarkdown>
            </Box>
          </Grid>
          {onDelete && (
            <Grid xs={2} item>
              <Button data-file-id={files.fileId} onClick={handleDeleteFile}>
                <DeleteForeverIcon fontSize="small" />
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    );
  }
  return (
    <Box padding={1.5}>
      <Grid wrap="nowrap" alignItems="center" container>
        <img
          src={files.toString()}
          onClick={() => {
            dingPreviewImage([files.toString()], files.toString());
          }}
          style={{ maxHeight: '10rem', maxWidth: '10rem' }}
        />
      </Grid>
    </Box>
  );
}
