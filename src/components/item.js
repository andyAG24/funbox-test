import React from 'react';


class Item extends React.Component {
    state = {
        highlightColors: {
            NOT_SELECTED_COLOR: '1698d9',
            NOT_SELECTED_HOVER_COLOR: '2ea8e6',
            SELECTED_COLOR: 'd91667',
            SELECTED_HOVER_COLOR: 'e62e7a',
            NOT_AVAILABLE_COLOR: 'e62e7a',
        },
        itemStatuses: {
            NOT_SELECTED_STATUS: 'not-selected',
            SELECTED_STATUS: 'selected',
            NOT_AVAILABLE_STATUS: 'not-available'
        },
        itemStatus: '',
        highlightColor: ''
    }

    componentWillMount() {
        if (!this.props.available) {
            this.setState({ itemStatus: this.state.itemStatuses.NOT_AVAILABLE_STATUS });
        } else {
            this.setState({ itemStatus: this.state.itemStatuses.NOT_SELECTED_STATUS });
        }
    }

    highlightItem(ev) {
        ev.preventDefault();

        let element = ev.currentTarget;
        let statuses = this.state.itemStatuses;
        let classSelected = 'item_selected'

        if (this.state.itemStatus === statuses.NOT_SELECTED_STATUS || this.state.itemStatus === '') {
            this.setState({ 
                itemStatus: statuses.SELECTED_STATUS
            });

            element.classList += ' ' + classSelected;
        } else if (this.state.itemStatus === statuses.SELECTED_STATUS) {
            this.setState({ 
                itemStatus: statuses.NOT_SELECTED_STATUS
            });
            element.classList.remove(classSelected);
        }
    }

    isAvailable() {
        let className = 'item item__wrapper';
        if (!this.props.available) {
            className += ' item_' + this.state.itemStatuses.NOT_AVAILABLE_STATUS;
        }
        return className;
    }

    render () {
        return (
            <React.Fragment>
                <div className="item">
                    <div className={this.isAvailable()} onClick={(ev) => this.props.available && this.highlightItem(ev)}>
                        <div className="item__wrapper-inside">
                            <div className="item__content-overlay"></div>
                            <div className="item__content">
                                <div className="item__description">
                                    <span className="item__header">Сказочное заморское яство</span>
                                    <span className="item__header-cat">Котэ не одобряет?</span>
                                </div>
                                <div className="item__title">
                                    <span className="item__title-text">{this.props.name}</span>
                                    <span className="item__title-text-filling">{this.props.filling}</span>
                                </div>
                                <div className="item__included">
                                    <span>{this.props.quantity}</span>
                                    <span>{this.props.gift}</span>
                                    {this.props.additionalData.about && 
                                        <span>{this.props.additionalData.about}</span>
                                    }
                                </div>
                                <div className="item__weight">
                                    <span className="item__weight-number">{this.props.weight}</span>
                                    <span className="item__weight-unit">кг</span>
                                </div>
                            </div>
                        </div>
                        { (this.state.itemStatus === this.state.itemStatuses.NOT_SELECTED_STATUS) &&
                            <span className="item__footer">Чего сидишь? Порадуй котэ, <span className="item__footer-buy">купи.</span></span>
                        }
                        { this.state.itemStatus === this.state.itemStatuses.SELECTED_STATUS &&
                            <span className="item__footer">{this.props.additionalData.fillingDescription}</span>
                        }
                        { this.state.itemStatus === this.state.itemStatuses.NOT_AVAILABLE_STATUS &&
                            <span className="item__footer item__footer_out-of-stock">Печалька, {this.props.filling} закончился.</span>
                        }
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}

export default Item;