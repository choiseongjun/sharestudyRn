import React from 'react';

import { View, Text,Image } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import images from 'res/images';
class HamberMenu extends React.PureComponent {
  _menu = null;
  
  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <View >
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>
            <Image
                  source={images.list3}
                  style={{resizeMode: 'contain', width: 25, height: 20}}
                />
          </Text>}
        >
          <MenuItem onPress={this.props.onClickLogout}>Logout</MenuItem>
          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
          <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
        </Menu>
      </View>
    );
  }
}

export default HamberMenu;