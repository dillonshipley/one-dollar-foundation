import React from 'react';
import {FadeImage} from './FadeImage'

export default class Footer extends React.Component {
  componentDidMount(){
    console.log("lit");
  }

    render(){
      return(
        <div>
          <div className = "footer">
            <div className = 'footerIcons'>
              <FadeImage url = 'youtube'/>
              <FadeImage url = 'instagram' />
              <FadeImage url = 'discord'/>
            </div>
          </div>
          <div className = "headerUnderline"></div>
        </div>
      )
    }
}
  