
import styled from "styled-components";

export const InputBlock = styled.div`

    input, select {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24);
        padding: 10px;
        border-radius: 50px;
        border: 2px solid #e4e4e4;
    }

    input:focus,
    select:focus {
        outline: none;
        border: 2px solid #3D9A96;
    }

    label {
        display: block;
        text-align: left;
        font-size: 12px;
        transform: translateX(7.5px);
        font-weight: 600;
    }

    input[type="date"] {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

`

export const Button = styled.button`
    background: #3D9A96; 
    border: 0;
    color: white;
    border-radius: 50px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24);
    padding: 10px;
    cursor: pointer;
    transition: box-shadow .25s, opacity .25s;

    &:disabled {
        opacity: .45;
        cursor: not-allowed;
    }

    &:hover + &:enabled {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24);
        opacity: .85;
    }

`;

export const GhostButton = styled(Button)`
    background: white;
    border: 1px solid #3D9A96;
    color: #3D9A96;

    &:hover {
        box-shadow: 0;
        opacity: .65;
    }
`

export const IconButton = styled(Button)`
    padding: 7.5px;
    margin-right: 5px;
`;
