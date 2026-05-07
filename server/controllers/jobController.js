import Job from '../models/Job.js';


async function GetJobs(req, res) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const jobs = await Job.find({ user_id: userId });
        if (jobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found' });
        }
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs' });
        console.error(error);
    }
}


async function CreateJob(req, res) {
    try {
        const { title, company, location, status, description} = req.body;
        const existingJob = await Job.findOne({ user_id: req.userId, title: title, company: company });
        if (existingJob) {
            return res.status(400).json({ message: 'Job already exists' });
        }
        await Job.create({ user_id: req.userId, title, company, location, status, description });
        res.status(201).json({ message: 'Job created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating job' });
        console.error(error);
    }
}

async function UpdateJob(req, res) {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (job.user_id.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized' })
        }
        await Job.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'Job updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating job' });
        console.error(error);
    }
}

async function DeleteJob(req, res) {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job' });
        console.error(error);
    }
}

export { GetJobs, CreateJob, UpdateJob, DeleteJob }