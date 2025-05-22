export const colors = {
    background: '#909196',
    backgroundActive: '#ffffff',
    text: 'rgba(0, 0, 0, 0.87)',
    focusBlue: '#1976d2', // Add this color for focused state
};

export const inputStyles = {
    base: {
        boxShadow: 'none',
        textTransform: 'none',
        backgroundColor: colors.background,
        borderRadius: '4px',
        width: '100%',
        pointerEvents: 'auto',
    },
    label: {
        top: '2px',
        fontSize: '12px',
        marginInlineStart: '10px',
        color: colors.text,
        pointerEvents: 'none',
    },
    input: {
        paddingLeft: '10px',
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 1,
    },
    inputText: {
        padding: '8px 0',
        cursor: 'text',
        position: 'relative',
        zIndex: 2,
    },
    states: {
        focus: {
            backgroundColor: colors.backgroundActive,
            fontWeight: 'bold',
        }
    },
    noUnderline: {
        borderBottom: 'none',
        pointerEvents: 'none',
    }
};

export const dimensions = {
    padding: {
        base: '8px',
        top: '24px',
    },
    borderRadius: '4px',
};

export const zIndex = {
    base: 1,
    active: 1000,
    menu: 1500,
};