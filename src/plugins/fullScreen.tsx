import Icon from 'components/Icon';
import * as React from 'react';
import { PluginComponent, PluginProps } from './Plugin';
import i18n from 'i18n';

interface FullScreenState {
  enable: boolean;
}

export default class FullScreen extends PluginComponent<PluginProps, FullScreenState> {
  static pluginName = 'fullScreen';
  static align = 'right';

  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      enable: this.editor.isFullScreen(),
    };
  }

  private handleClick() {
    this.editor.fullScreen(!this.state.enable);
  }

  private handleChange(enable: boolean) {
    this.setState({ enable });
  }

  componentDidMount() {
    this.editor.on('fullscreen', this.handleChange);
  }

  componentWillUnmount() {
    this.editor.off('fullscreen', this.handleChange);
  }

  render() {
    if (this.editorConfig.view && this.editorConfig.view.fullScreen) {
      const { enable } = this.state;
      return (
        <span
          className="button button-type-fullscreen"
          title={i18n.get(enable ? 'btnExitFullScreen' : 'btnFullScreen')}
          onClick={this.handleClick}
        >
          <Icon type={`icon-${enable ? 'shrink' : 'enlarge'}`} />
        </span>
      );
    } else {
      return null;
    }
  }
}
