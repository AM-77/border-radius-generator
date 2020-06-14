import React, { Component, ChangeEvent } from 'react'
import copy from 'copy-to-clipboard' 

interface IProps {
  onDimensionChange: (value: number, prop: string) => void
  width: number
  height: number
  topOp: number
  top: number
  bottomOp: number
  bottom: number
  left: number
  rightOp: number
  right: number
  leftOp: number
  onControlRangeChange: (isHalf: boolean) => void
}

interface IState {
  width: number
  height: number
  copied: boolean
}

export default class Controllers extends Component<IProps, IState> {

  constructor(props: IProps) { 
    super(props) 

    const { width, height } = this.props
    this.state = { width, height, copied: false }
  }

  onDimensionChange = (e: ChangeEvent<HTMLInputElement> , prop: string) => {
    const { onDimensionChange } = this.props
    const value = parseInt(e.target.value)
    this.setState((state) => ({ ...state, [prop]: value}), () => onDimensionChange(value , prop))
  }

  onControlRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { onControlRangeChange } = this.props
    onControlRangeChange(!e.target.checked)
  }

  onCopy = () => {
    const { topOp, top, bottomOp, bottom, left, rightOp, right, leftOp } = this.props
    copy(`border-radius: ${topOp}% ${top}% ${bottomOp}% ${bottom}% / ${left}% ${rightOp}% ${right}% ${leftOp}%;`)
    
    this.setState({ copied: true }, () => { setTimeout(() => { this.setState({copied: false}) }, 1200) })
  }

  render() {
    const { width, height, copied } = this.state
    const { topOp, top, bottomOp, bottom, left, rightOp, right, leftOp } = this.props

    return (
      <div className="controllers-container">
        <div className="dimensions">
          <h2>Dimensions</h2>
          <div className="control">
            <span>Full Control</span>
            <input type="checkbox" onChange={this.onControlRangeChange} />
          </div>
          <div className="dims">
            <div className="dim">
              <p>width: </p>
              <input type="number" min="0" value={width} onChange={(e) => this.onDimensionChange(e, "width")} />
            </div>
            <div className="dim">
            <p>height: </p>
            <input type="number" min="0" value={height} onChange={(e) => this.onDimensionChange(e, "height")} />
          </div>
          </div>
        </div>
        <div className="border-radius">
          <p>
            <span className="prop">border-radius: </span> 
            <span className="value">{`${topOp}% ${top}% ${bottomOp}% ${bottom}% / ${left}% ${rightOp}% ${right}% ${leftOp}%;`}</span>
          </p>
          <div className="copy">
            <button onClick={this.onCopy}>
              { 
                copied ?
                  <svg height='100%' width='100%' viewBox="0 0 496 496"><path d="m494.492188 243.308594-37.25-51.386719 6.601562-63.109375c.359375-3.449219-1.539062-6.734375-4.707031-8.144531l-57.980469-25.800781-25.800781-57.984376c-1.417969-3.160156-4.699219-5.054687-8.144531-4.710937l-63.121094 6.597656-51.382813-37.246093c-2.800781-2.03125-6.589843-2.03125-9.390625 0l-51.386718 37.246093-63.117188-6.597656c-3.441406-.328125-6.710938 1.5625-8.144531 4.703125l-25.800781 57.984375-57.984376 25.808594c-3.164062 1.40625-5.0625 4.691406-4.703124 8.136719l6.597656 63.117187-37.246094 51.386719c-2.03125 2.800781-2.03125 6.589844 0 9.390625l37.246094 51.382812-6.597656 63.121094c-.363282 3.445313 1.535156 6.734375 4.703124 8.144531l57.984376 25.800782 25.800781 57.984374c1.425781 3.148438 4.699219 5.042969 8.144531 4.710938l63.117188-6.601562 51.386718 37.25c2.800782 2.03125 6.589844 2.03125 9.390625 0l51.382813-37.25 63.121094 6.601562c3.445312.347656 6.722656-1.546875 8.144531-4.703125l25.800781-57.984375 57.980469-25.808594c3.164062-1.410156 5.0625-4.691406 4.707031-8.136718l-6.601562-63.121094 37.25-51.382813c2.035156-2.800781 2.035156-6.597656 0-9.398437zm-52 53.863281c-1.160157 1.597656-1.6875 3.566406-1.480469 5.527344l6.304687 60.382812-55.480468 24.699219c-1.8125.796875-3.265626 2.242188-4.066407 4.054688l-24.679687 55.480468-60.398438-6.3125c-1.960937-.203125-3.925781.328125-5.519531 1.488282l-49.160156 35.632812-49.167969-35.632812c-1.363281-.996094-3.003906-1.53125-4.6875-1.527344-.28125 0-.5625 0-.800781.039062l-60.402344 6.3125-24.679687-55.480468c-.804688-1.8125-2.25-3.261719-4.0625-4.066407l-55.511719-24.6875 6.304687-60.382812c.203125-1.960938-.324218-3.929688-1.480468-5.527344l-35.632813-49.167969 35.632813-49.167968c1.15625-1.597657 1.683593-3.566407 1.480468-5.527344l-6.304687-60.386719 55.480469-24.695313c1.8125-.796874 3.261718-2.242187 4.0625-4.054687l24.679687-55.480469 60.402344 6.3125c1.957031.195313 3.921875-.335937 5.519531-1.488281l49.167969-35.632813 49.167969 35.632813c1.59375 1.15625 3.558593 1.683594 5.519531 1.488281l60.398437-6.3125 24.679688 55.480469c.804687 1.8125 2.253906 3.257813 4.066406 4.0625l55.480469 24.6875-6.304688 60.386719c-.207031 1.960937.320313 3.929687 1.480469 5.527344l35.628906 49.167968zm0 0"/><path d="m341.425781 157.308594c-3.125-3.125-8.1875-3.125-11.3125 0l-130.101562 130.101562-39.625-39.550781c-3.121094-3.113281-8.175781-3.113281-11.296875 0l-22.679688 22.542969c-1.503906 1.5-2.351562 3.539062-2.351562 5.664062s.847656 4.164063 2.351562 5.664063l67.921875 67.921875c3.121094 3.121094 8.1875 3.121094 11.3125 0l158.398438-158.402344c3.121093-3.121094 3.121093-8.1875 0-11.3125zm-141.414062 175.382812-56.601563-56.601562 11.3125-11.285156 39.640625 39.558593c3.121094 3.117188 8.179688 3.117188 11.304688 0l130.101562-130.089843 11.328125 11.328124zm0 0"/></svg>
                :
                  <svg height='100%' width='100%' viewBox='0 0 24 24'>
                    <path d='m17.5 24c-3.584 0-6.5-2.916-6.5-6.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5zm0-12c-3.032 0-5.5 2.468-5.5 5.5s2.468 5.5 5.5 5.5 5.5-2.468 5.5-5.5-2.468-5.5-5.5-5.5z' />
                    <path d='m17.5 21c-.128 0-.256-.049-.354-.146l-3-3c-.195-.195-.195-.512 0-.707s.512-.195.707 0l2.646 2.646 2.646-2.646c.195-.195.512-.195.707 0s.195.512 0 .707l-3 3c-.096.097-.224.146-.352.146z' />
                    <path d='m17.5 21c-.276 0-.5-.224-.5-.5v-6c0-.276.224-.5.5-.5s.5.224.5.5v6c0 .276-.224.5-.5.5z' />
                    <path d='m9.5 21h-7c-1.379 0-2.5-1.121-2.5-2.5v-13c0-1.379 1.121-2.5 2.5-2.5h2c.276 0 .5.224.5.5s-.224.5-.5.5h-2c-.827 0-1.5.673-1.5 1.5v13c0 .827.673 1.5 1.5 1.5h7c.276 0 .5.224.5.5s-.224.5-.5.5z' />
                    <path d='m11.5 6h-6c-.827 0-1.5-.673-1.5-1.5v-2c0-.276.224-.5.5-.5h1.55c.232-1.14 1.243-2 2.45-2s2.218.86 2.45 2h1.55c.276 0 .5.224.5.5v2c0 .827-.673 1.5-1.5 1.5zm-6.5-3v1.5c0 .275.225.5.5.5h6c.275 0 .5-.225.5-.5v-1.5h-1.5c-.276 0-.5-.224-.5-.5 0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5c0 .276-.224.5-.5.5z' />
                    <path d='m13.5 9h-10c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h10c.276 0 .5.224.5.5s-.224.5-.5.5z' />
                    <path d='m10.5 12h-7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h7c.276 0 .5.224.5.5s-.224.5-.5.5z' />
                    <path d='m8.5 15h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5s-.224.5-.5.5z' />
                    <path d='m16.5 9c-.276 0-.5-.224-.5-.5v-3c0-.827-.673-1.5-1.5-1.5h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c1.379 0 2.5 1.121 2.5 2.5v3c0 .276-.224.5-.5.5z' />
                  </svg>
              }
            </button>
          </div>
        </div>
      </div>
    )
  }
}
