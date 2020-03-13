import React, { useState, useRef } from 'react';
import Step from './Step';
import Block from './blocks/AddRecipeBlock';


const Steps = ({steps = [], onChange}) => {
  
    const setRank = steps => {
        onChange( "steps", steps.map( (step, index) => { return { "rank": index + 1, "content": step.content} })) 
    }

    const addStep = (item) => {
        steps.push(item)
        setRank(steps)  
    }

    const deleteStep = (step) => {
        const index = steps.indexOf(step)
        steps.splice(index, 1)
        setRank(steps)
    } 

    const updateStep = (step, index) => {
        steps[index] = step
        setRank(steps)
    }

    return ( 
        <>
            {steps.map( (step, index) => {
                return <Block label={ "Etape " + (parseInt(index)+ 1) } key={index} >
                    <Step 
                        index={index}
                        step={step}
                        onUpdate={ updateStep } 
                        onDelete={ deleteStep }
                    />
                </Block>   
            })}
            <Block label="Nouvelle étape">
                <Step 
                    onAdd ={ addStep }   
                />
            </Block>
        </>
              
     );
}
 
export default Steps;

