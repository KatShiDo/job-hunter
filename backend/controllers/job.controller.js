import JobDto from "../dtos/job.dto.js";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createJob = async (request, response, next) => {
  const { title, salaryUp, salaryDown, description, exp } = request.body;
  if (!title || title == "") {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const user = await User.findById(request.user.id);
  const companyId = user.companyId;
  const newJob = new Job({
    title,
    salaryUp,
    salaryDown,
    description,
    exp,
    companyId,
  });
  try {
    const savedJob = await newJob.save();
    const jobDto = new JobDto(savedJob);
    response.status(200).send(jobDto);
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (request, response, next) => {
  try {
    const {
      jobId,
      companyId,
      page,
      limit,
      searchTerm,
      salaryUp,
      salaryDown,
      expUp,
      expDown,
      order,
      category,
    } = request.query;
    size = size ? size : 10;
    page = page ? page : 0;
    const startIndex = page * size;
    const sortDirection = order == "asc" ? 1 : -1;
    const jobs = await Job.find(
      ...(companyId && { companyId }),
      ...(category && { category }),
      ...(jobId && { _id: jobId }),
      ...(searchTerm && {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ],
      })
    )
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const jobsDto = jobs.map((job) => new JobDto(job));
    response.status(200).send(jobsDto);
  } catch (error) {
    next(error);
  }
};
