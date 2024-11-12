import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  Grid,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

const Templates = () => {
  const [template, setTemplate] = useState({
    name: '',
    category: 'MARKETING',
    language: 'en',
    components: {
      header: { type: 'TEXT', text: '' },
      body: { text: '' },
      footer: { text: '' },
      buttons: [],
    },
  });

  const categories = ['MARKETING', 'AUTHENTICATION', 'UTILITY'];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'pt', name: 'Portuguese' },
  ];

  const addButton = () => {
    if (template.components.buttons.length < 3) {
      setTemplate({
        ...template,
        components: {
          ...template.components,
          buttons: [...template.components.buttons, { type: 'QUICK_REPLY', text: '' }],
        },
      });
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Template Builder" />
          <CardContent>
            <div style={{ marginBottom: '16px' }}>
              <TextField
                fullWidth
                label="Template Name"
                value={template.name}
                onChange={(e) => setTemplate({ ...template, name: e.target.value })}
              />
              <Select
                fullWidth
                value={template.category}
                onChange={(e) => setTemplate({ ...template, category: e.target.value })}
                displayEmpty
                style={{ marginTop: '16px' }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
              <Select
                fullWidth
                value={template.language}
                onChange={(e) => setTemplate({ ...template, language: e.target.value })}
                displayEmpty
                style={{ marginTop: '16px' }}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            {/* Components */}
            <div>
              <Typography variant="body2" gutterBottom>
                Header
              </Typography>
              <TextField
                fullWidth
                label="Header Text"
                value={template.components.header.text}
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    components: {
                      ...template.components,
                      header: { ...template.components.header, text: e.target.value },
                    },
                  })
                }
              />

              <Typography variant="body2" gutterBottom style={{ marginTop: '16px' }}>
                Body
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message Body"
                value={template.components.body.text}
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    components: {
                      ...template.components,
                      body: { ...template.components.body, text: e.target.value },
                    },
                  })
                }
              />

              <Typography variant="body2" gutterBottom style={{ marginTop: '16px' }}>
                Footer
              </Typography>
              <TextField
                fullWidth
                label="Footer Text"
                value={template.components.footer.text}
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    components: {
                      ...template.components,
                      footer: { ...template.components.footer, text: e.target.value },
                    },
                  })
                }
              />

              {/* Buttons */}
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Buttons</Typography>
                  <Button variant="outlined" size="small" onClick={addButton} disabled={template.components.buttons.length >= 3}>
                    <Add style={{ marginRight: '4px' }} />
                    Add Button
                  </Button>
                </div>
                {template.components.buttons.map((btn, index) => (
                  <div key={index} style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <TextField
                      label="Button Text"
                      value={btn.text}
                      onChange={(e) => {
                        const newButtons = [...template.components.buttons];
                        newButtons[index] = { ...btn, text: e.target.value };
                        setTemplate({
                          ...template,
                          components: {
                            ...template.components,
                            buttons: newButtons,
                          },
                        });
                      }}
                    />
                    <IconButton
                      color="error"
                      onClick={() => {
                        const newButtons = template.components.buttons.filter((_, i) => i !== index);
                        setTemplate({
                          ...template,
                          components: {
                            ...template.components,
                            buttons: newButtons,
                          },
                        });
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="contained" fullWidth style={{ marginTop: '16px' }}>
              Submit Template
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Preview Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Preview" />
          <CardContent>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
              {template.components.header.text && (
                <Typography variant="h6">{template.components.header.text}</Typography>
              )}
              {template.components.body.text && (
                <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                  {template.components.body.text}
                </Typography>
              )}
              {template.components.footer.text && (
                <Typography variant="body2" color="textSecondary">
                  {template.components.footer.text}
                </Typography>
              )}
              {template.components.buttons.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
                  {template.components.buttons.map((btn, index) => (
                    <Button key={index} variant="contained" color="primary" style={{ marginBottom: '8px' }}>
                      {btn.text || 'Button Text'}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Templates;
