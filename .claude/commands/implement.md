# Autonomous Implementation

Launch an autonomous agent to implement the specified task following Laravel best practices.

## Task

$ARGUMENTS

## Instructions

Launch a **general-purpose agent** to implement this task autonomously.

The agent should:
1. Read the Laravel conventions from `.claude/commands/laravel:make.md`
2. Check for PRDs in `docs/ACTIVE/` for context
3. Use TodoWrite to create a checklist and track progress 
4. Implement following the Laravel guidelines 
5. Write tests and verify everything works 
6. Complete all acceptance criteria 
7. Write completed in `docs/COMPLETED/` when done 
8. Commit code changes with clear messages only adding relevant files

Use the Task tool with `subagent_type: "general-purpose"` to launch the agent.