# MIPS Visualiser
[![Build Status](https://travis-ci.com/aleksa-sukovic/mips-visualiser.svg?token=zCspA5s4zGkRNiq8zzR1&branch=master)](https://travis-ci.com/aleksa-sukovic/mips-visualiser)

Interactive MIPS processor simulation and visualisation.

[Check it out](https://aleksa-sukovic.github.io/mips-visualiser)

# Purpose

MIPS visualiser is project aimed at showcasing underlying principles of every CPU using MIPS architecture as an example.

# What can you do

When using MIPS simulator, these are the steps you could follow:

1. Modify registers *(optional)*.

2. Modify RAM memory *(optional)*.

3. Load the instruction.

4. Execute instruction either as a whole or step by step.

## Modifying registers

- You can manipulate individual registers.

    - Note that some of them aren't editable such as $ir, $target and $zero.

- By default, all values are set to 0. Not all instructions require registers to be edited.

- Hover over register's alias to display its purpose and current value in binary.

    - When you modify values, you write them in *decimal*.

- When referencing registers you can use numbers or aliases *(e.g. $0 and $zero are pointing to same register)*.

## Modifying memory

- You can set values for specific memory locations (addresses).

- You do not have to set memory values for every instruction, it is optional.

- By default, when you load an instruction, it is written at address that *$pc* register points to.

## Loading instructions

- Instructions are specified using MIPS assembly language.

- Supported instructions:
    1. **add**
    2. **addi**
    3. **sub**
    4. **slt**
    5. **beq**
    6. **bne**
    7. **lw**
    8. **sw**
    
- Instructions modify registers and memory in real time, so be sure to check out changed values after execution.

## Executing instructions

Once you set up instruction, registers and memory, it's time for execution.

You can:

1. Execute instruction clock by clock.

2. Execute all clocks in a sequence.

Animation speeds can also be altered, which will reflect to both methods of execution.

## Inspecting the CPU

Once instruction execution begins, you can inspect different parts of the CPU while it's executing.

Provided CPU schema is interactive, hover over any of the focused elements to get details regarding it.

# Adding new instructions

I have included only a subset of MIPS ISA which, in my opinion, is sufficient for demonstrating principles.

However, I have made it quite easy to implement new instructions which would fit right into the existing architecture.

## Defining instruction

Instructions are defined in a single configuration file `Specification.ts`

```javascript
const Specification = {
    ...,
    instructions: [
        {
            alias: 'add',
            opcode: '000000',
            funct: '100000',
            type: 'R',
            clocks: [
               'clock_1',
               'clock_2',
               'custom_clock',
            ] 
        }
    ],
    ...,    
}
```

## Defining clocks

As you can see, among other things, instructions define clocks they use. 

Some clocks are same for every instruction.

- Precisely, clock 1 and 2 are common for every instruction. 

- Rest of the clocks vary from instruction to instruction.

Clocks are defined both as separate classes and in config file:

```typescript
class CustomClock implements Clock
{
    public id (): string
    {
        return 'custom_clock'; // id referenced by instruction
    }

    public execute (cpu: CPU): void
    {
        // Manipulate the CPU.
    }
}
```

And in `Specification.ts` file:

```javascript
const Specification = {
    ...,
    clocks: [
        {
            id: 'custom_clock',
            focus: ['el1', 'el2', ...],
            tooltips: [
                {
                   ... 
                } 
            ]
        }
    ],
    ...
};
```

As you can see there are few different steps:

1. Defining class that implement interface `Clock`.
   
   - Define the clock id, used to reference the clock inside an instruction.
   
   - Implement the clock logic.
   
   - Add clock to `ClockFactory.fromId(id: string): Clock` method.

2. Define clock in `Specification.ts`. Clock is defined by:

   - id: same id you put in Clock implementation.
   
   - focus: List of HTML entities to be focused when this clock is active.
   
   - tooltips: Array of objects defining tooltips.
   
## Defining tooltips

Tooltips are blocks of information visible on element hover. 

You can define tooltips that are shown only when certain clock is active, or ones that are not tied to any particular clock (*global*).

Tooltip is defined by:

1. ids: List of HTML entities which will trigger this tooltip.

2. additional: List of HTML entities to be focused when this tooltip becomes active.

3. title: String representing tooltip title.

4. description: HTML representing tooltip description.

5. value: Function that takes the cpu instance and returns a value of particular component.

    - This is mostly used when tooltip is related to a Clock. This function allows us to extract values from CPU in runtime.
    

```javascript
const tooltip = {
    ids: ['el1', 'el2', ...],
    additional: ['el3', 'el4'],
    title: 'Tooltip title',
    description: '<div>Tooltip HTML body.</div>',
    value: (cpu: CPU) => {
        return cpu.register('$3').value;
    }
};
```
   
### Global tooltips

Global tooltips are defined `Specitifcation.ts` file:

```javascript
const Specification = {
    ...,
    global_tooltips: [
       ... 
    ],
    ...,
};
```

### Clock specific tooltips

Clock specific tooltips are define inside configuration object of a specific clock.

# Technologies

1.) Angular 8.

2.) Jasmine + Karma.

3.) Tailwind CSS.

4.) Docker/Travis/GitHub Pages.

# Allowed commands

#### Running tests
```shell script
docker exec -it mips-visualiser ng test --watch=false
```
#### Bash into container
```shell script
docker exec -it mips-visualiser bash
```

# Local setup

1. Clone this repository wherever you see fit.
2. From terminal, navigate to cloned repository.
3. Run `docker-compose build`.
4. Run `docker-compose up`.
5. From host machine: `docker exec -it mips-visualiser bash`.
6. Run `npm i`.
7. Run `ng serve --host 0.0.0.0`.
8. Navigate to *http://localhost:4200*.
9. Upon next container initialization, command number 7. will be automatically run.
